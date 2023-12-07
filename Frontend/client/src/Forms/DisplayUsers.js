import React, { useState, useEffect } from 'react';

const DisplayUsers = () => {
  const [jsonData, setJsonData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  const fetchData = async () => {
    try {
      const credentialsOption = document.cookie.includes('connect.sid')
        ? 'include'
        : 'same-origin';
  
      const response = await fetch('https://miniproject9-backend.onrender.com/v1/api/users', {
        method: 'GET',
        credentials: credentialsOption,
        redirect: 'manual',
      });
  
      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Data:', data);
        setJsonData(data);
      } else {
        console.warn(`Unexpected response type: ${contentType}.`);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on mount

  const handleDeleteUser = async () => {
    try {
      if (!selectedUserId) {
        console.error('No user selected for deletion.');
        return;
      }

      const response = await fetch('https://miniproject9-backend.onrender.com/v1/deleteUser', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: selectedUserId }),
      });

      if (response.ok) {
        fetchData();
        setSelectedUserId('');
      } else {
        console.error(`Error deleting user:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error deleting user:`, error);
    }
  };

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
