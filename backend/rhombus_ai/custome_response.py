'''
Custome Response class to provide comprehensive API response to the client 
'''
class CustomeReponse:
    ERROR_FILE_NOT_PROVIDED = {"response_type": "error", "message": "No file provided.", "data": None}
    ERROR_UNSUPPORTED_FILE = {"response_type": "error", "message": "Unsupported file format. Only CSV and Excel files are allowed.", "data": None}

    ERROR_INTERNAL_SERVER = {"response_type": "error", "message": "Internal Server Error", "data": None}

    @staticmethod
    def success_response(message:str, data:dict = None):
        return {
            "response_type": "success",
            "message": message,
            "data": data 
        }