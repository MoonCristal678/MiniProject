import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('https://miniproject9-backend.onrender.com/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include credentials (cookies) in the request
      });
  
      if (response.ok) {
        // Redirect to the root URL after logout
        window.location.href = '/';
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  return (
    <button
      onClick={handleLogout}
      style={{
        marginLeft: '10px',
        padding: '8px 12px',
        borderRadius: '5px',
        backgroundColor: '#8B4513', 
        color: '#C4A484', 
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#A0522D')}
      onMouseOut={(e) => (e.target.style.backgroundColor = '#8B4513')} 
    >
      Logout
    </button>
  );
};

export default LogoutButton;
