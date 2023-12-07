import React, { useState, useEffect } from 'react';

const DisplayUsers = () => {
  const [jsonData, setJsonData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('https://miniproject9-backend.onrender.com/v1/api/users', {
        method: 'GET',
        credentials: 'include',
        redirect: 'manual',  // Disable automatic following of redirects
      });
  
      if (response.status === 200) {
        // Handle the successful response (possibly JSON data)
        const data = await response.json();
        console.log('Data:', data);
        setJsonData(data);
      } else if (response.status === 302) {
        // Handle the redirection if needed
        console.log('Redirected to:', response.headers.get('location'));
      } else {
        // Handle other cases where the response is not OK
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      // Handle the error or display a user-friendly message
    }
  };
  useEffect(() => {
    fetchData()
      .then(response => response.json())
      .then(console.log);
  }, []);


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
