CODE CLIMATE GRADE: B

1. File Schema (fileSchema.js):
Purpose:

Defines the Mongoose schema for files.
Each file has a unique name and content.
Details:

name: Represents the file name and is a required field.
content: Represents the content of the file and is a required field.
Usage:

Exported as the File model for use in other parts of the application.
2. File Updater (fileUpdater.js):
Purpose:

Provides functionality to update files.
Functions:

renderUpdateFileForm(req, res): Renders the form to update a file.
updateFile(req, res): Updates a file based on user input.
Details:

Utilizes the File model for database interactions.
Handles errors and server responses.
Exported:

Functions exported for use in other files.
3. File Reader (fileReader.js):
Purpose:

Provides functionality to read files.
Functions:

renderReadFileForm(req, res): Renders the form to read a file.
readFile(req, res): Reads a file based on the selected file name.
Details:

Utilizes the File model for database interactions.
Handles errors and server responses.
Exported:

Functions exported for use in other files.
4. File Deleter (fileDeleter.js):
Purpose:

Provides functionality to delete files.
Functions:

renderDeleteFileForm(req, res): Renders the form to delete a file.
deleteFile(req, res): Deletes a file based on the selected file name.
Details:

Utilizes the File model for database interactions.
Handles errors and server responses.
Exported:

Functions exported for use in other files.
5. File Operations (fileOperations.js):
Middleware and Setup:

Sets up an Express app with middleware (body parsing, method override, CORS).
Connects to MongoDB using Mongoose.
Routes:

Defines routes for file operations and user-related operations.
Each operation has its route and corresponding functions.
Error Handling:

Utilizes an error handler middleware for catching and logging errors.
Home Page:

Renders a home page with links to various file and user operations.
Helper Functions:

Includes helper functions for rendering user forms and handling server errors.
6. How to Run:
Requirements:

Node.js and npm installed.
MongoDB running with correct connection details.
Steps:

Clone the repository and navigate to the project directory.
Install dependencies: npm install.
Start the server: npm start.
Access:

Open a web browser and go to http://localhost:3000.
Usage:

Click on the provided links to perform file and user operations.


Validation Middleware (validateUserInput and validateFileInput):
1. Purpose:
validateUserInput:
Validates user input before adding a new user.
validateFileInput:
Validates file input before creating a new file.
2. Implementation:
Middleware (express-validator):
Utilizes the express-validator library for input validation.
3. Functions:
validateUserInput(req, res, next):

Validates the input fields for adding a new user.
Checks the following:
name: Not empty, trimmed, and escaped.
age: Must be a non-negative integer.
bloodType: Not empty, trimmed, and escaped.
birthdate: Must be a valid ISO8601 date.
countryOfBirth: Not empty, trimmed, and escaped.
validateFileInput(req, res, next):

Validates the input fields for creating a new file.
Checks the following:
fileName: Not empty, trimmed, and escaped.
fileContent: Not empty, trimmed, and escaped.
4. Usage:
Middleware Integration:
Integrated into the respective routes for adding new users and creating new files.
Applied using app.use in the main fileOperations.js file.
javascript
Copy code
// Example usage in fileOperations.js
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// ...

// Middleware for validating user input
v1Router.post('/api/users', validateUserInput, addUser);

// Middleware for validating file input
v1Router.post('/write', validateFileInput, writeFile);
5. Result:
If validation fails, an array of errors is provided in the response.
The middleware ensures that the input adheres to specified rules before proceeding to user creation or file writing.


RUN:

NPM INSTALL

NODE FILEOPERATONS.JS