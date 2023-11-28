
Project ReadMe: User Authentication and Data Management
Overview
This project implements user authentication and data management using Node.js, Express, MongoDB, Passport.js, and Bcrypt.js. It includes features such as user registration, login, logout, and basic CRUD operations for user data and file management. The project is structured using the Express application framework and uses the Mongoose library for MongoDB interaction.

Setup
Before running the project, make sure to install the required dependencies:


npm install passport passport-local bcryptjs express-session
Additionally, make sure you have a MongoDB database set up and provide the connection URI in the mongoose.connect function call in the fileOperations.js file.

Project Structure
fileOperations.js: The main entry point of the application. Configures Express, sets up middleware, connects to MongoDB, and defines routes.
userAuth.js: Defines the User Authentication routes, including registration, login, and logout. Implements Passport.js for authentication and Bcrypt.js for password hashing.
schemas.js: Contains the Mongoose schema for user data.
v1Router.js: Handles API routes for user data and file management.
User Authentication
Routes
/auth/register (POST): Allows users to register with a unique username, a password (hashed using Bcrypt.js), and an email address.
/auth/login (POST): Authenticates users based on their username and password using Passport.js local strategy.
/auth/logout (POST): Logs out the authenticated user.
Passport.js Configuration
LocalStrategy: Uses Passport.js Local Strategy for authenticating users based on a username and password.
serializeUser: Serializes the user object to the session.
deserializeUser: Deserializes the user from the session.
Session Management
Uses express-session to handle user sessions and keep track of login status.
User Data Management
User Model
Defines a Mongoose schema for user data with fields for username, password, and email.
CRUD Operations
Create (Register): Handles user registration, ensuring unique usernames and email addresses.
Read: Displays user information on the home page upon successful login.
Update: Allows users to update their information.
Delete: Enables users to delete their accounts.
File Management
File Read and Write
Allows users to read, write, and delete files with content.
Additional Features
Middleware: Uses middleware to log requests, check user authentication status, and provide flash messages for success and error messages.
Running the Project
Set up a MongoDB database and update the connection URI in fileOperations.js.
Install dependencies: npm install.
Run the application: npm start or node fileOperations.js.
Access the application at http://localhost:3000/.