ReadMe: Frontend Components - Login.js, Register.js, and App.js
Login.js
Overview
The Login.js component is responsible for rendering a login form, handling user authentication, and providing a link to the registration page.

Usage
State Management:

useState hooks manage the username, password, errorMessage, and redirectToRegister state variables.
Authentication:

The handleLogin function sends a POST request to the server for user authentication.
Displays an error message if authentication fails.
Navigation:

Includes a link to redirect users to the registration page.
Conditional Rendering:

Redirects to the registration page if the redirectToRegister state is true.
Styling:

Basic styling using CSS-in-JS for a responsive and user-friendly interface.
Register.js
Overview
The Register.js component renders a registration form, handles user registration, and provides a link to the login page.

Usage
State Management:

useState hooks manage the username, password, email, and errorMessage state variables.
Registration:

The handleRegister function sends a POST request to the server for user registration.
Displays an error message if registration fails.
Styling:

Basic styling using CSS-in-JS for a responsive and user-friendly interface.
Navigation:

Includes a link to redirect users to the login page.
App.js
Overview
The App.js component serves as the main entry point for the application, managing user authentication and rendering either the login page or the main application page based on the user's login status.

Usage
State Management:

useState hooks manage the isLoggedIn state variable.
Authentication:

The handleLogin function sets the isLoggedIn state to true upon successful login.
The handleLogout function sends a POST request to the server for user logout.
Conditional Rendering:

Renders either the Login component or the main application content based on the user's login status.
Styling:

Basic styling using CSS-in-JS for a responsive and user-friendly interface.
Running the Frontend
Ensure the backend server is running.
Install dependencies: npm install.
Run the frontend: npm start.
Access the application at http://localhost:3000/.