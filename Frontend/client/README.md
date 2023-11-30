React File Operations App (App.js)
Overview
The App.js file serves as the main entry point for the React application. This application allows users to interact with file and user data operations, leveraging a Node.js backend with Express and MongoDB for server-side functionalities.

Features
Display JSON Data:

Upon loading, the app fetches user data from the server and displays it in a section titled "JSON Data."
User data includes information such as ID, name, age, blood type, country of birth, and date of birth.
Write to a File:

The app provides a form (WriteFileForm) allowing users to write content to a file.
Users can enter a file name and its content, and upon submission, the content is written to the specified file on the server.
Read a File:

Users can input a file name in a text field and click a "Read File" button to fetch and display the content of the specified file.
If the file is not found, an error message is displayed.
Display File Contents:

The content of the file, when successfully read, is displayed in a separate section.
File List:

A list of available files is displayed in a separate section, showing users the existing files on the server.
Users can delete files directly from this list.
Error Handling:

The app incorporates error handling, such as displaying an error message if a file is not found or if there's an issue with reading or writing.
File Deletion:

Users can delete a file by selecting it from the file list.
The deletion updates the file list and removes the file from the server.
User-Friendly UI:

The app features a user-friendly interface with sections for JSON data, file operations, and error messages.
Separation of Components:

The code is structured with modular components such as WriteFileForm, ReadFileForm, and FileList to enhance readability and maintainability.
Styling:

The app includes basic styling to improve the visual presentation and provide a better user experience.
Usage
Installation:

Clone the repository to your local machine.
Run npm install to install dependencies.
Run the App:

Start the Node.js server by navigating to the server directory and running npm start.
Start the React app by navigating to the client directory and running npm start.
Access the App:

Open a web browser and navigate to http://localhost:3000 to access the React app.
Interact with the App:

Explore different sections to perform file and user data operations.
Follow the prompts and form submissions to read, write, and delete files, as well as interact with JSON data.
Technologies Used
React.js
Node.js
Express.js
MongoDB

RUNS ON RENDER.COM CHANGE LINKS IN FETCH CALLS FOR localhost