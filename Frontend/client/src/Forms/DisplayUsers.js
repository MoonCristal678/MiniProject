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
      const response = await fetch('https://miniproject9-backend.onrender.com/v1/api/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('myUserIdCookie')}`,
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

  const handleDeleteUser = async () => {
    try {
      if (!selectedUserId) {
        console.error('No user selected for deletion.');
        return;
      }

      const response = await axios.post(
        'https://miniproject9-backend.onrender.com/v1/deleteUser',
        { userId: selectedUserId },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        fetchData();
        setSelectedUserId('');
      } else {
        console.error(`Error deleting user:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error deleting user:`, error);
    }
  };

  useEffect(() => {
    // Fetch data only if authenticated
    if (authenticated) {
      fetchData();
    }
  }, [authenticated]);

  return (
    <div className="app-json-section">
      <h2>JSON Data</h2>
      {authenticated ? ( // Render the content only if authenticated
        <>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="" disabled>Select a user to delete</option>
            {jsonData.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            className="app-delete-button"
            onClick={handleDeleteUser}
            disabled={!selectedUserId}
          >
            Delete User
          </button>
          <ul className="app-file-list">
            {jsonData.map((user) => (
              <li key={user.createdBy}>
                Name: {user.name}, Age: {user.age}, Blood Type: {user.bloodType},
                Country of Birth: {user.countryOfBirth}, Date of Birth: {user.birthdate}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Please log in to view user data.</p>
      )}
    </div>
  );
};

export default DisplayUsers;
