from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.core.paginator import Paginator
from .custome_response import *
from .open_ai_api import *
import pandas as pd
import logging
import pickle
from .models import TemporaryData
import json
import numpy as np

logger = logging.getLogger("rhombus_ai")

'''
Function to get file content based on the provided param sent by the client

Param
page: Number
page_size: Number (15 by default)
'''
class GetUploadFileAPI(APIView):
    def get(self, request, *args, **kwargs):
        logger.info(f"Incoming request to GetUploadFileAPI: {request}")
        try:

            # Getting the last uploaded file
            temp_data = TemporaryData.objects.last()

            df = pickle.loads(temp_data.data_blob)
            data = df.to_dict(orient='records')

            page = request.query_params.get('page', 1)
            page_size = request.query_params.get('page_size', 15)

            paginator=Paginator(data, page_size)
            try:
                current_page = paginator.page(page)
            except Exception as e:
                return Response({"error": "Invalid page number"}, status=status.HTTP_400_BAD_REQUEST)

            return Response({
                "count": paginator.count,
                "num_pages": paginator.num_pages,
                "results": current_page.object_list,
                "next": int(page) + 1 if current_page.has_next() else None,
                "previous": int(page) - 1 if current_page.has_previous() else None,
            }, status=status.HTTP_200_OK)
        
        except TemporaryData.DoesNotExist:
            logger.error("No uploaded files found in the database.")
            return Response({"error": "No data available"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error in GetUploadFileAPI function: {str(e)}")
            return Response(CustomeReponse.ERROR_INTERNAL_SERVER, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


'''
Function to upload Excel or CSV file, the file will be stored in the PostgreSQL temporarily to save storage.
Return the first 15 rows of the file.

FormData
file: Excel or CSV file

Notes: This approach can be updated by storing all the uploaded file to the database if requirement specifies
'''
class UploadFileAPI(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file', None)
        logger.info(f"Incoming request to UploadFileAPI: {file}")
        if not file:
            return Response(CustomeReponse.ERROR_FILE_NOT_PROVIDED, status=status.HTTP_400_BAD_REQUEST)
        
        file_extension = file.name.split('.')[-1]

        # Validate the file extension, only accept csv and xlsx
        if file_extension not in ['csv', 'xlsx']:
            return Response(CustomeReponse.ERROR_UNSUPPORTED_FILE, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            existing_file = TemporaryData.objects.last()

            # If user upload different file, remove the last uploaded file
            # Ensuring only 1 file present at the database
            if existing_file and existing_file.file_name != file.name:
                logger.info(f"Deleting previously uploaded file: {existing_file.file_name}")
                existing_file.delete()

            if file_extension == 'csv':
                df = pd.read_csv(file)
            else:
                df = pd.read_excel(file)

            df.replace([np.inf, -np.inf], np.nan, inplace=True)
            df.fillna(value=0, inplace=True)

            invalid_data = df[df.isin([np.nan, np.inf, -np.inf]).any(axis=1)]
            if not invalid_data.empty:
                logger.warning(f"Invalid data found: {invalid_data}")

            data_blob = pickle.dumps(df)

            # Storing file to database as a blob
            TemporaryData.objects.create(file_name=file.name, data_blob=data_blob)
            logger.info(f"File '{file.name}' uploaded as a blob. The data: {df}")

            data = df.to_dict(orient='records')
            paginator = Paginator(data, 15) # Default page_size
            first_page = paginator.page(1)

            return Response({
                "msg": "File uploaded successfully",
                "count": paginator.count, 
                "num_pages": paginator.num_pages, 
                "results": first_page.object_list,  
                "next": 2 if paginator.num_pages > 1 else None,  
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Error in handle_pattern_matching function: {str(e)}")
            return Response(CustomeReponse.ERROR_INTERNAL_SERVER, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


'''
Function to find the pattern matching based on User prompt and replace it with the replacement value

Param
page: Number
page_size: Number (15 by default)
'''
class PatternMatchingAPI(APIView):
    def post(self, request, *args, **kwargs):
        logger.info(f"Incoming request to PatternMatchingAPI: {request}")
        try:
            page = request.query_params.get('page', 1)
            page_size = request.query_params.get('page_size', 15)
            request_body = json.loads(request.body)
            user_prompt = request_body.get('user_prompt')

            temp_data = TemporaryData.objects.last()
            df = pickle.loads(temp_data.data_blob)
            data = df.to_dict(orient='records')

            paginator = Paginator(data, page_size)
            try:
                # Getting file content based on the provided page and page_size
                current_page = paginator.page(page)
            except Exception as e:
                return Response({"error": "Invalid page number"}, status=status.HTTP_400_BAD_REQUEST)

            df = current_page.object_list
            
            # Passing dataframe to interact with OpenAI API
            resp, err = open_ai_file_pattern_matching(df, user_prompt)
            if err is not None:
                if err == CustomeReponse.ERROR_INTERNAL_SERVER:
                    return Response(CustomeReponse.ERROR_INTERNAL_SERVER, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
            return Response({"results": resp}, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Error in PatternMatchingAPI function: {str(e)}")
            return Response(CustomeReponse.ERROR_INTERNAL_SERVER, status=status.HTTP_500_INTERNAL_SERVER_ERROR)