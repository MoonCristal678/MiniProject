import React, { useState } from 'react';
import './App.css';
import FileList from './Forms/fileList';
import WriteFileForm from './Forms/WriteFileForm';
import ReadFileForm from './Forms/ReadFileForm';
import DisplayUsers from './Forms/DisplayUsers';
import AddUserForm from './Forms/AddUserForm';
import { UpdateFileForm, UpdateUserForm } from './Forms/ReusableForm';
import LoginForm from './Forms/LoginForm';

function App() {
  const [readContent, setReadContent] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedUserData, setAuthenticatedUserData] = useState(null);

  const handleLogin = async () => {
    try {
      // Fetch user data after successful login
      const userDataResponse = await fetchUserData();
      const userData = await userDataResponse.json();

      // Check if user data contains information about the authenticated user
      if (userData._id) {
        // Call the parent component's login callback with user data
        setIsAuthenticated(true);
        setAuthenticatedUserData(userData);
        console.log('Authenticated User Data:', userData);
        // Perform any additional actions, such as updating the UI, etc.
      } else {
        console.error('Login failed. Unable to fetch user data.');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://miniproject9-backend.onrender.com/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include credentials (cookies) in the request
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setAuthenticatedUserData(null);
        // You can add additional logic here, such as clearing user data or redirecting to a login page.
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleDeleteUser = (deletedUserId) => {
    console.log(`User '${deletedUserId}' deleted. Update user list logic here.`);
  };

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <>
          <h1 className="app-title">User Data and File Contents</h1>
          <button onClick={handleLogout}>Logout</button>
          <DisplayUsers onDeleteUser={handleDeleteUser} authenticatedUserData={authenticatedUserData} />
          <AddUserForm authenticatedUserData={authenticatedUserData} />
          <UpdateUserForm authenticatedUserData={authenticatedUserData} />
          <WriteFileForm authenticatedUserData={authenticatedUserData} />
          <ReadFileForm setReadContent={setReadContent} authenticatedUserData={authenticatedUserData} />
          {readContent && (
            <div className="app-section">
              <h2>Read Content</h2>
              <p>{readContent}</p>
            </div>
          )}
          <FileList authenticatedUserData={authenticatedUserData} />
          <UpdateFileForm authenticatedUserData={authenticatedUserData} />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
