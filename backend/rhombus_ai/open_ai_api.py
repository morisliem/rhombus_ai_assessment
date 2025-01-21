import os
import io
import pandas as pd
from dotenv import load_dotenv
from openai import OpenAI
from django.views.decorators.csrf import csrf_exempt
from .custome_response import *
import logging

logger = logging.getLogger("rhombus_ai")
load_dotenv()

'''
Function to send chat completions to Open AI API 
to do pattern matching and replacement to the file content based 
on the user prompt

Data type
dataframe: DataFrame
prompt: String
'''
@csrf_exempt
def open_ai_file_pattern_matching(dataframe, prompt):
    logger.info(f"Incoming request to open_ai_file_pattern_matching. {dataframe, prompt}")
    file_content = dataframe

    client = OpenAI(api_key=os.getenv('OPEN_AI_KEY'))
    try:
        logger.info(f"Sending request to OPEN AI API")

        # Sending API request to Open AI
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful assistant for processing files."},
                {"role": "user", "content": f"""Here is the file content:\n{file_content}\n\n{prompt}\n.
                                              please return the response strictly in this following format 
                                              of even tough the prompt seems unreasonable. Answer must goes inside the square bracket 
                                              ['SUCCESS' if table get updated and 'FAILED' if table is not updated]
                                              [ragex pattern]
                                              [replacement_value]
                                              [updated_table]"""}
            ]
        )
        # Getting GPT response
        gpt_response = response.choices[0].message.content

        # Filter out irrelevant response
        response_lines = [line.strip() for line in gpt_response.split("\n")]
        filtered_response_lines = [line for line in response_lines if '[' in line and ']' in line]

        # Handle invalid GPT response format
        if len(filtered_response_lines) < 4:
            logger.error(f"Invalid GPT response format: {filtered_response_lines}")
            return None, CustomeReponse.ERROR_INTERNAL_SERVER
        
        # Filter out character "'", "[", "]" for each variable
        status = filtered_response_lines[0].strip("[']")
        regex_pattern = filtered_response_lines[1].strip("[r']")
        replacement_value = filtered_response_lines[2].strip("[']")
        updated_table_raw = filtered_response_lines[3]
        updated_table_raw = updated_table_raw.replace("'", '"')

        # Convert GPT response to appropriate format
        updated_table_df = None
        try:
            updated_table_df = pd.read_json(io.StringIO(updated_table_raw), orient='records')
            updated_table_df = updated_table_df.to_dict(orient='records')
        except ValueError as e:
            logger.error(f"Error converting updated table to DataFrame: {str(e)}")
            return None, CustomeReponse.ERROR_INTERNAL_SERVER
        
        return {
            "status": status,
            "regex_pattern": regex_pattern,
            "replacement_value": replacement_value,
            "table": updated_table_df,
        }, None

    except Exception as e:
        logger.error(f"Error in open_ai_file_pattern_matching: {str(e)}")
        return None, CustomeReponse.ERROR_INTERNAL_SERVER
