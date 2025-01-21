# Pattern matching & Replacement project frontend

This project demonstrates React application for pattern matching and replacement. It uses simple react, sass for the styling, react-router-dom for the router. This server is running in the port 3000

## 1. Project Structure

`frontend/`<br>
`├── src/`<br>
`│   ├── components/`<br>
`│   │   └──home-page/`<br>
`│   │   |  |──home-page.jsx`<br>
`│   │   |  └──home-page.sass`<br>
`│   │   └──loading-spinner/`<br>
`│   │   |  |──loading-spinner.jsx`<br>
`│   │   |  └──loading-spinner.sass`<br>
`│   │   └──nav-bar/`<br>
`│   │   |  |──nav-bar.jsx`<br>
`│   │   |  └──nav-bar.sass`<br>
`│   │   └──no-page/`<br>
`│   │   |  |──no-page.jsx`<br>
`│   │   |  └──no-page.sass`<br>
`│   │   └──notification/`<br>
`│   │   |  |──└──notification.jsx`<br>
`│   │   |  └──└──notification.sass`<br>
`│   │   └──pagination/`<br>
`│   │   |  └──pagination.jsx`<br>
`│   │   |  └──pagination.sass`<br>
`│   │   └──pattern-matching/`<br>
`│   │   |  |──pattern-matching.jsx`<br>
`│   │   |  └──pattern-matching.sass`<br>
`│   │   └──table/`<br>
`│   │   |  |──table.jsx`<br>
`│   │   |  └──table.sass`<br>
`│   │   └──text-area/`<br>
`│   │   |  |──text-area.jsx`<br>
`│   │   |  └──text-area.sass`<br>
`│   ├── index.css`<br>
`│   ├── App.js`<br>
`│   └── index.js`<br>
`├── public/`<br>
`├── Dockerfile`<br>
`├── .env`<br>
`├── package.json`<br>
`├── package-lock.json`<br>

## 2. Key Components

- **`frontend/`**: Root directory for the frontend side of the project.
  - **`src/`**: Entry point for the web application
    - **`home-page/`**: This folder contains homepage component and its styling
    - **`loading-spinner/`**: This folder contains loading spinner component and its styling
    - **`nav-bar/`**: This folder contains navbar component and its styling
    - **`no-page/`**: This folder contains no-page component and its styling, this component will be shown when trying to access any invalid url
    - **`notification/`**: This folder contains notification component and its styling
    - **`pagination/`**: This folder contains pagination component and its styling for handling overflowing data
    - **`pattern-matching/`**: This folder contains pattern matching & replacement component and its styling
    - **`table/`**: This folder contains table component and its styling
    - **`text-area/`**: This folder contains text area component and its styling
  - **`public/`**: This folder contains static files
  - **`package.json`**: Contains all packages needed to run the project.
  - **`Dockerfile`**: Dockerfile which provides the instruction to install all the required dependencies of the project and run the program
  - **`.env`**: This file consists of all the secret key variable to set up the project. In this case, backend based url

## 3. Env File Setup
In this project, env file only consists of the following information <br>
`REACT_APP_BACKEND_URL=[backend url]`<br>

Make sure the wording is exatly following the template provided to run the program.
Replace '[ . . . ]' with the appropriate value
