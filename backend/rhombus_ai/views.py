from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .controller import *
from .custome_response import *
import pandas as pd
import logging

logger = logging.getLogger("rhombus_ai")

class PatternMatchingAPI(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file', None)
        user_prompt = request.data.get('user_prompt', None)
        logger.info(f"Incoming request to PatternMatchingAPI: {file_obj, user_prompt}")
        
        if not file_obj:
            return Response(CustomeReponse.ERROR_FILE_NOT_PROVIDED, status=status.HTTP_400_BAD_REQUEST)

        (resp, msg), err = handle_pattern_matching(file_obj, user_prompt)
        if err is not None:
            if err == CustomeReponse.ERROR_UNSUPPORTED_FILE:
                return Response(CustomeReponse.ERROR_UNSUPPORTED_FILE, status=status.HTTP_400_BAD_REQUEST)
            elif err == CustomeReponse.ERROR_INTERNAL_SERVER:
                return Response(CustomeReponse.ERROR_INTERNAL_SERVER, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(CustomeReponse.success_response(msg, resp), status=status.HTTP_200_OK)
 