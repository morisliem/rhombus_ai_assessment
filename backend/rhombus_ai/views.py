from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
import pandas as pd

class FileUploadAPI(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file', None)
        if not file_obj:
            return Response({"error": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)

        file_extension = file_obj.name.split('.')[-1]
        if file_extension not in ['csv', 'xlsx']:
            return Response({"error": "Unsupported file format. Only CSV and Excel files are allowed."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if file_extension == 'csv':
                df = pd.read_csv(file_obj)
            else:
                df = pd.read_excel(file_obj)

            print(df.head())  

            return Response({"message": "File uploaded successfully.", "columns": df.columns.tolist()}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Error processing file: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)