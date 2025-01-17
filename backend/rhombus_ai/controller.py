import logging
from .custome_response import *
from .open_ai_api import *
import pandas as pd

logger = logging.getLogger("rhombus_ai")

def handle_pattern_matching(file, user_prompt):
    file_extension = file.name.split('.')[-1]
    if file_extension not in ['csv', 'xlsx']:
        return {}, CustomeReponse.ERROR_UNSUPPORTED_FILE
    
    try:
        if file_extension == 'csv':
            df = pd.read_csv(file)
        else:
            df = pd.read_excel(file)

        (open_ai_resp, msg), err = file_pattern_matching(df, user_prompt)
        if err is not None:
            if err == CustomeReponse.ERROR_INTERNAL_SERVER:
                return {}, CustomeReponse.ERROR_INTERNAL_SERVER

        return  (open_ai_resp, msg), None
    except Exception as e:
        logger.error(f"Error in handle_pattern_matching function: {str(e)}")
        return {}, CustomeReponse.ERROR_INTERNAL_SERVER