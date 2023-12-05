
README: React Frontend for Authentication and File Management
This README provides an overview of the React frontend for a Node.js application, focusing on authentication and file management. The frontend interacts with the backend server, allowing users to log in, register, manage user data, and perform file operations.

Components:
1. LoginForm.js:
Purpose: Handles user login functionality.
State:
loginData: Tracks the username and password entered by the user.
errorMessage: Stores any error messages during login attempts.
redirectToRegister: Redirects to the registration form if true.
Functions:
redirectToRegisterPage: Sets redirectToRegister to true.
handleInputChange: Updates loginData when the user types in the login form.
handleLogin: Sends a login request to the server, handles success or failure.
2. RegistrationForm.js:
Purpose: Manages user registration functionality.
State:
registrationData: Stores the entered username, email, and password.
errorMessage: Displays any registration error messages.
Functions:
handleInputChange: Updates registrationData as the user types.
handleRegister: Sends a registration request to the server, handles success or failure.
3. App.js:
Purpose: Serves as the main component orchestrating various forms and displays based on authentication status.
State:
readContent: Holds the content of a file when read.
isAuthenticated: Tracks whether a user is authenticated or not.
Functions:
handleLogin: Updates isAuthenticated when the user logs in.
handleLogout: Initiates a logout request to the server, updating isAuthenticated on success.
handleDeleteUser: Placeholder function for handling user deletions (can be customized).
Components:
DisplayUsers: Component displaying a list of users with delete functionality.
AddUserForm: Form for adding new users.
UpdateUserForm: Form for updating user information.
WriteFileForm: Form for writing a new file.
ReadFileForm: Form for reading the content of a file.
FileList: Component displaying a list of files.
UpdateFileForm: Form for updating the content of a file.
Usage:
Clone the repository and navigate to the project directory.
Ensure the backend server is running on http://localhost:3000.
Install dependencies using npm install.
Start the React app using npm start.
Access the application at http://localhost:3001 in your browser.
User Flow:
If the user is authenticated:
Displays user data and file content functionalities.
Allows the user to logout.
If the user is not authenticated:
Displays the login form (LoginForm).
On successful login, switches to authenticated mode, displaying user and file functionalities.
Note:
The application assumes the backend server is running at http://localhost:3000.
Ensure that the server is properly configured for handling authentication and file operations.
Modify the components as needed for specific requirements or integrate additional features.

#ON RENDER.COM LOCALHOST IS THE GENERIC LINK USED FOR DEVLEOPMENT 