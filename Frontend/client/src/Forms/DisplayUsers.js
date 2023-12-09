import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const DisplayUsers = () => {
  const [jsonData, setJsonData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://miniproject9-backend.onrender.com/v1/api/users', {
        withCredentials: true,
        headers: {
          'Accept': 'application/json', 
          'Authorization': `Bearer ${Cookies.get('myUserIdCookie')}`, // Get the cookie value
          'Content-Type': 'application/json',
        },
      });

      setJsonData(response.data);
    } catch (error) {
      console.error('Fetch Error:', error);
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
    fetchData();
  }, []);
  return (
    <div className="app-json-section">
      <h2>JSON Data</h2>
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
          <li key={user._id}>
            Name: {user.name}, Age: {user.age}, Blood Type: {user.bloodType},
            Country of Birth: {user.countryOfBirth}, Date of Birth: {user.birthdate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayUsers;
