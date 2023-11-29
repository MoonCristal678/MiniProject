import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import FileOperations from './operations';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
  
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://miniproject8-backend.onrender.com/auth/logout', {
        method: 'POST', 
      });

      if (response.ok) {
        setIsLoggedIn(false);
        
      } else {
        console.error('Failed to logout');
       
      }
    } catch (error) {
      console.error('Error during logout:', error);
      
    }
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <>
        <button className="app-button" onClick={handleLogout}>
            Logout
          </button>
          <FileOperations />
          
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
