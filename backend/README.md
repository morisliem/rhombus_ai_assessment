# Pattern matching & Replacement project Backend

This project demonstrates Django application for pattern matching and replacement. It uses PostgreSQL as the database to temporary store user Excel or CSV file. This server is running in the port 8000

## 1. Project Structure

This Django project structure looks like this:<br>
`backend/`<br>
`├── manage.py`<br>
`├── backend/`<br>
`│   ├── init.py`<br>
`│   ├── settings.py`<br>
`│   ├── urls.py`<br>
`│   └── wsgi.py`<br>
`├── rhombus_ai/`<br>
`│   ├── models.py`<br>
`│   ├── views.py`<br>
`│   ├── urls.py`<br>
`│   └── forms.py`<br>
`│   └── apps.py`<br>
`│   └── custome_response.py`<br>
`│   └── tests.py`<br>
`│   └── open_ai_api.py`<br>
`└── requirements.txt`<br>
`└── .env`<br>
`└── Dockerfile`<br>

## 2. Key Components

- **`manage.py`**: A command-line utility that lets you interact with this Django project. You use it to run commands like `runserver`, `migrate`, `makemigrations`, etc.

- **`backend/`**: This directory contains your project's settings, URLs, and WSGI configuration.
  - **`__init__.py`**: An empty file that tells Python that this directory should be considered a Python package.
  - **`settings.py`**: Contains all the settings for your Django project (e.g., database configuration, installed apps).
  - **`urls.py`**: Contains the URL declarations for the project. It routes URL requests to the appropriate views.
  - **`wsgi.py`**: The entry point for WSGI-compatible web servers to serve your project.

- **`rhombus_ai/`**: This is where the code for Rhombus_ai project
  - **`models.py`**: Defines the data models for the application. (Model)
  - **`views.py`**: Contains the logic for handling requests and returning responses. (View)
  - **`urls.py`**: List of all the endpoints for Rhombus_ai project
  - **`open_ai_api.py`**: This file handles the third party integration with Open AI API

- **`requirements.txt`**: Lists the Python packages required for your project.
- **`Dockerfile`**: Dockerfile which provides the instruction to install all the required dependencies of the project and run the program
- **`.env`**: This file consists of all the secret key variable to set up the project. In this case, the secret key for database configuration and open_ai api key

## 3. Env File Setup
In this project, env file only consists of the following information
`POSTGRES_DB=[enter_database]`<br>
`POSTGRES_USER=[database_user]`<br>
`POSTGRES_PASSWORD=[database_password]`<br>
`DB_HOST=[database_root_password]`<br>
`DB_PORT=[database_root_password]`<br>
`OPEN_AI_KEY=[open_ai_key]`<br>
`DJANGO_KEY=[django key]`<br>

Make sure the wording is exatly following the template provided to run the program
replace '[ . . . ]' with the appropriate value

## 4. API Contract
##### 1. Upload file [POST]

Request Example:
```
curl --location 'http://localhost:8000/api/upload' \
--form 'file=@"/Users/rajamoris/Downloads/test1.csv"'
```

Response Example:
```
{
    "msg": "File uploaded successfully",
    "count": 3,
    "num_pages": 1,
    "results": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane_smith@domain.com"
        },
        {
            "id": 3,
            "name": "Alice Brown",
            "email": "alice.brown@website.org"
        }
    ],
    "next": null
}
```

##### 2. Get file content [GET]

Request Example:
```
curl --location 'http://localhost:8000/api/get-file?page=2&page_size=5'
```

Response Example:
```
{
    "count": 3,
    "num_pages": 1,
    "results": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane_smith@domain.com"
        },
        {
            "id": 3,
            "name": "Alice Brown",
            "email": "alice.brown@website.org"
        }
    ],
    "next": null,
    "previous": null
}
```

##### 3. Pattern matching & replacement [POST]

Request Example:
```
curl --location 'http://localhost:8000/api/pattern-matching?page=1&page_size=15' \
--header 'Content-Type: application/json' \
--data '{
    "user_prompt": "find all email address in email field and replace with '\''testing'\''"
}'
```

Response Example:
```
{
    "data": {
        "status": "SUCCESS",
        "regex_pattern": "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b",
        "replacement_value": "testing",
        "table": {
            "id": [
                1,
                2,
                3
            ],
            "name": [
                "John Doe",
                "Jane Smith",
                "Alice Brown"
            ],
            "email": [
                "testing",
                "testing",
                "testing"
            ]
        }
    }
}
```

