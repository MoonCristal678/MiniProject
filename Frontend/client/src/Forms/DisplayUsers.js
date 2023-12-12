import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../AuthContext'; // Import the useAuth hook

const DisplayUsers = () => {
  const { authenticated } = useAuth(); // Use the useAuth hook to get authentication status
  const [jsonData, setJsonData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/v1/api/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const users = await response.json();
      setJsonData(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/v1/deleteUser',
        { userId },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        fetchData();
      } else {
        console.error(`Error deleting user:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error deleting user:`, error);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchData();
    }
  }, [authenticated]);

  return (
    <div className="app-json-section">
      <h2>JSON Data</h2>
     
          <ul className="app-file-list">
            {jsonData.map((user) => (
              <li key={user._id}>
                Name: {user.name}, Age: {user.age}, Blood Type: {user.bloodType},
                Country of Birth: {user.countryOfBirth}, Date of Birth: {user.birthdate}
                <button
                  className="app-delete-button"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete User
                </button>
              </li>
            ))}
          </ul>
      
    
    </div>
  );
};

export default DisplayUsers;