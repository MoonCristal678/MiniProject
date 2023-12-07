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

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      // Your logout logic
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleDeleteUser = (deletedUserId) => {
    console.log(`User '${deletedUserId}' deleted. Update user list logic here.`);
  };

  const fetchData = () => {
    // Implement your fetchData logic here
    console.log('Fetching data...');
  };

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <>
          <h1 className="app-title">User Data and File Contents</h1>
          <button onClick={handleLogout}>Logout</button>
          <DisplayUsers onDeleteUser={handleDeleteUser} />
          <AddUserForm />
          <UpdateUserForm />
          <WriteFileForm />
          <ReadFileForm setReadContent={setReadContent} />
          {readContent && (
            <div className="app-section">
              <h2>Read Content</h2>
              <p>{readContent}</p>
            </div>
          )}
          <FileList />
          <UpdateFileForm />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} fetchData={fetchData} />
      )}
    </div>
  );
}

export default App;
