CODE CLIMATE GRADE: C BUT TO BE FAIR THEY WERE FLAGGING SINGLE LINES OF CODE THAT WERE SLIGHTLY SIMILAR
README: Express Authentication and File Management
This README provides an overview of the authentication system implemented using Express, Passport, and session management, along with the file management functionality in a Node.js application.

Authentication:
User Model:

The application uses Mongoose to define a UserAuth model with fields for username, password, and email.
The userAuthRouter is an Express router that handles authentication routes.
Session Management:

Express session middleware is used for managing user sessions.
The session middleware is configured with a secret, resave, and saveUninitialized options, and a cookie with a specified maxAge.
Passport Configuration:

Passport is configured with a LocalStrategy for authenticating users based on username and password.
Serialization and deserialization methods are implemented to store and retrieve user information in sessions.
Login Route:

The /login route renders a login page (login.ejs) and handles POST requests for user authentication.
Passport's authenticate method is used for local authentication.
Logout Route:

The /logout route logs out the user, destroys the session, and redirects to the login page.
Registration Route:

The /register route renders a registration page (register.ejs) and handles POST requests to register new users.
User input is validated using express-validator.
Passwords are hashed using bcrypt before being stored in the database.
File Management:
File Model:

Mongoose is used to define a File model with fields for name, content, and createdBy (user association).
Middleware and Server Setup:

Middleware includes session setup, Passport initialization, CORS configuration, and other necessary middleware for file operations.
The server is set up with Express, listening on a specified port.
Routes:

The application has various routes for file operations:
/read: Read the content of a file.
/write: Write a new file.
/delete: Delete a file.
/updateFile: Update the content of a file.
/files: View files associated with the authenticated user.
File Operations:

File routes are protected using the isAuthenticated middleware, ensuring that only authenticated users can perform file operations.
File operations involve interacting with the File model, ensuring that actions are limited to files associated with the authenticated user.
Error Handling:

The application includes error handling for various scenarios, with error messages logged and appropriate responses sent.
User Management:
User Model:

Another Mongoose model, User, is used to store additional user data like name, age, bloodType, birthdate, and countryOfBirth.
User Routes:

Routes are provided for adding, updating, deleting, and viewing users.
Routes are protected to ensure that only authenticated users can perform these operations.
User Operations:

User operations involve interacting with the User model, and input validation is done using express-validator.
API Versioning:

Routes related to user and file operations are grouped under the /v1 namespace for API versioning.
Helper Functions:

Helper functions are implemented for rendering user forms and handling common server errors.
Running the Server:
Clone the repository and navigate to the project directory.
Install dependencies using npm install.
Set up a MongoDB database and update the connection string in the mongoose.connect call.
Create a .env file and set a value for SESSION_SECRET.
Run the server using npm start.
Access the application at http://localhost:3000 in your browser.
Feel free to explore the provided routes and functionality in the application.