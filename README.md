## README for MiniProject-1 Backend

### Overview

This backend application provides functionality for managing user data and files. It's built with Node.js, Express, and MongoDB. The server is configured to run over HTTPS, and it includes user authentication using JWT (JSON Web Token).

### Prerequisites

1. **Node.js and npm:** Make sure you have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

2. **MongoDB:** Set up a MongoDB database and obtain a connection string. Update the MongoDB connection string in the code accordingly.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/MiniProject-1.git
   ```

2. Navigate to the `Backend` directory:

   ```bash
   cd MiniProject-1/Backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Generate SSL certificates for HTTPS:

   - Create or obtain SSL certificates (key.pem and cert.pem).
   - Replace the placeholder certificates in the `Backend` directory with your generated certificates.

### Configuration

1. **MongoDB Configuration:**
   - Open `fileOperations.js` and replace the MongoDB connection string with your own.

2. **JWT Secret Key:**
   - Open `config.js` and set a secure secret key for JWT.

### Running the Server

```bash
npm start
```

This will start the server on `https://localhost:3000`.

### User Authentication

- **Login:**
  - Access the login page: `https://localhost:3000/auth/login`
  - Enter your credentials.
  - Upon successful login, you will be redirected to the home page.

- **Registration:**
  - Access the registration page: `https://localhost:3000/auth/register`
  - Provide the required information and submit the form.

- **Logout:**
  - Click the "Logout" button on the home page to log out.

### HTTPS Configuration

The server is configured to run over HTTPS using the certificates provided. Ensure that your certificates are valid and properly configured.

### API Routes

- **User Routes:**
  - `/v1/api/users`: Display JSON data of all users.
  - `/v1/add`: Add a new user.
  - `/updateUser`: Update user information.
  - `/deleteUser`: Delete a user.

- **File Routes:**
  - `/v1/read`: Read a file.
  - `/v1/write`: Write to a file.
  - `/v1/delete`: Delete a file.
  - `/v1/updateFile`: Update a file.
  - `/v1/files`: View all files.

### Notes

- Make sure to handle CORS properly, as it's configured to allow requests from `http://localhost:3001`.

Feel free to customize the code according to your project requirements. If you encounter any issues, refer to the error messages and logs for troubleshooting.