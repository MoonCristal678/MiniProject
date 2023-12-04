import React, { useState, useEffect } from 'react';
import DeleteUserButton from './DeleteUserButton';

const DisplayUsers = () => {
  const [jsonData, setJsonData] = useState([]);

  const fetchData = async () => {
    try {
      // Assuming your server sets a session cookie upon login
      const response = await fetch('http://localhost:3000/v1/api/users', {
        credentials: 'include', // Include credentials (session cookie)
      });
      const data = await response.json();
      setJsonData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = (deletedUserId) => {
    setJsonData((prevData) => prevData.filter((user) => user._id !== deletedUserId));
  };

  return (
    <div className="app-json-section">
      <h2>JSON Data</h2>
      <ul className="app-file-list">
        {jsonData.map((user) => (
          <li key={user._id}>
            Name: {user.name}, Age: {user.age}, Blood Type: {user.bloodType},
            Country of Birth: {user.countryOfBirth}, Date of Birth: {user.birthdate}
            <DeleteUserButton userId={user._id} onDelete={handleDeleteUser} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayUsers;
