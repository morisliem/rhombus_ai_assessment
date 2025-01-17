import os
import io
import pandas as pd
from dotenv import load_dotenv
from openai import OpenAI
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from .controller import *
from .custome_response import *
import logging

logger = logging.getLogger("rhombus_ai")
load_dotenv()

@csrf_exempt
def file_pattern_matching(dataframe, prompt):
    file_content = dataframe.to_csv(index=False)
    original_content = file_content

    client = OpenAI(api_key=os.getenv('OPEN_AI_KEY'))
    try:
        logger.info(f"Sending request to OPEN AI API")
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful assistant for processing files."},
                {"role": "user", "content": f"Here is the file content:\n{file_content}\n\n{prompt}"}
            ]
        )

        gpt_response = response.choices[0].message.content

        if "```" in gpt_response:
            file_content = gpt_response.split("```")[1].strip()
        else:
            file_content = gpt_response.strip()
    
        modified_df = pd.read_csv(io.StringIO(file_content))

        failure_indicators = ["no changes", "cannot", "unable", "does not contain", "not found"]
        if any(indicator in gpt_response.lower() for indicator in failure_indicators):
            logger.info("GPT response indicates the operation could not be performed.")
            original_content_df = pd.read_csv(io.StringIO(original_content))
            return (original_content_df, "The operation could not be performed."), None
        
        # return CustomeReponse.success_response("File processed successfully", modified_df)
        return (modified_df, "File process successfully"), None

    except Exception as e:
        logger.error(f"Error in file_patter_matching: {str(e)}")
        return {}, CustomeReponse.ERROR_INTERNAL_SERVER