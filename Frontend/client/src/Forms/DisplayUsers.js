import React, { useState } from 'react';
import { useFetchData } from './sharedFunction';

const DisplayUsers = () => {
  const [jsonData, setJsonData] = useState([]);

  useFetchData('http://localhost:3001/v1/api/users', setJsonData);

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
