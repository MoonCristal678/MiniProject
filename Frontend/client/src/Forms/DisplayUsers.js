// DisplayUsers.js
import React, { useState, useEffect } from 'react';

const DisplayUsers = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    async function fetchJsonData() {
      try {
        const response = await fetch('http://localhost:3001/v1/api/users');
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    }

    fetchJsonData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="app-json-section">
      <h2>JSON Data</h2>
      <ul className="app-file-list">
        {jsonData.map((user) => (
          <li key={user.id}>
            ID: {user.id}, Name: {user.name}, Age: {user.age}, Blood Type: {user.bloodType},
            Country of Birth: {user.countryOfBirth}, Date of Birth: {user.birthdate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayUsers;
