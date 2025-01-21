# rhombus_ai_assessment

## About The Project
Pattern Matching and Data Processing Web Application

This project involves building a web application using Django and React that allows users to upload CSV or Excel files, identify patterns in text columns using natural language input, and replace matched patterns with specified values. The application uses a Large Language Model (LLM) to interpret natural language inputs, converts them into regex patterns, and performs the necessary replacements on the data.

Key Features: <br>
	1.	Backend (Django): Handles file processing, data transformations, and API endpoints for natural language to regex conversion. <br>
	2.	Frontend (React): Provides an intuitive interface for uploading files, specifying patterns and replacements, and displaying updated data in a tabular format. <br>
	3.	LLM Integration (OpenAI API): Converts user-provided natural language inputs into regex patterns, ensuring flexibility and accuracy for various use cases. <br>

## Run this Project

The project is containerized using docker and can be run using docker-compose. Follow the steps below to run the project using the provided `docker-compose.yaml` file.

1. Ensure docker and docker compose are installed
- Docker guide: https://docs.docker.com/get-started/
- Install docker : https://docs.docker.com/engine/install/

2. Project Structure
This is the overview of the project structure
`.`<br>
`├── docker-compose.yml`<br>
`├── frontend/`<br>
`│   ├── Dockerfile`<br>
`│   └── ... (frontend code and files)`<br>
`├── backend/`<br>
`│   ├── Dockerfile`<br>
`│   ├── .env`<br>
`│   └── ... (backend code and files)`<br>

- Backend directory contains django application. Detailed information about backend project can be access [here](./backend/README.md)
- Frontend directory contains react application. Detailed information about frontend project can be access [here](./frontend/README.md)

3. Prepare `.env` file for both backend and frontend
- Inside the `backend/.env` file, ensure all the environment variables mentioned [here](./backend/README.md#3-env-file-setup) are included.
- Inside the `frontend/.env` file, ensure all the environment variables mentioned [here](./frontend/README.md#3-env-file-setup) are included.

4. Build and start the containers <br>
Ensure docker application is running and open a terminal in the root directory (where the `docker-compose.yaml` is located) and run the following command:
```
docker-compose up --build
```
- This command will build the images for backend, frontend and database and start the containers
- The backend containers will handle migration automatically

5. Access the application
- Frontend: Open your browser and navigate to `http://localhost:3000`
- Backend: The API can be accessed at `http://localhost:8000`
- PostgreSQL (database): The database will be available on port `5432`

6. Shutting down the application <br>
To stop the containers, press `Ctrl + C` in the terminal where the application is running. Then, remove the containers with
```
docker-compose down
```

Notes:
- Frontend Dockerfile: Ensure the Dockerfile installs all necessarry dependencies and run the app with `npm start`
- Backend Dockerfile: Ensure the Dockerfile installs python dependencies, copies code into the containers and uses the django `runserver` command as specified in the `docker-compose.yaml`
- Backend API contract can be found [here](./backend/README.md#4-api-contract)
