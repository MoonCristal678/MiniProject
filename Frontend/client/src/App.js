// components/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import ReadFileForm from '../Forms/ReadFileForm';
import WriteFileForm from '../Forms/WriteFileForm';
import DeleteFileForm from '../Forms/DeleteFileForm';
import { fetchData, handleAddUser, handleDeleteFile } from '../utils/apiUtils';

function App() {
  const [readContent, setReadContent] = useState('');
  const [createdFiles, setCreatedFiles] = useState({});
  const [jsonData, setJsonData] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [countryOfBirth, setCountryOfBirth] = useState('');

  useEffect(() => {
    async function fetchJsonData() {
      try {
        const response = await fetchData('https://backend-j7qq.onrender.com/v1/api/users');
        const data = await response.json();
        console.log(data);
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    }

    fetchJsonData();
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Welcome to the File Operations Page</h1>

      <ReadFileForm setReadContent={setReadContent} />
      <WriteFileForm setCreatedFiles={setCreatedFiles} />
      <DeleteFileForm setCreatedFiles={setCreatedFiles} />

      <div className="app-section">
        <h2>Created Files</h2>
        <ul className="app-file-list">
          {Object.keys(createdFiles).map((fileName) => (
            <li key={fileName}>
              {fileName}
              <button className="app-delete-button" onClick={() => handleDeleteFile(fileName)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="app-section">
        <h2>Add User to JSON Data</h2>
        <input
          type="text"
          name="newName"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter name"
        />
        <input
          type="text"
          name="newAge"
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
          placeholder="Enter age"
        />
        <input
          type="text"
          name="bloodType"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          placeholder="Enter blood type"
        />
        <input
          type="date"
          name="birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          placeholder="Enter birthdate"
        />
        <input
          type="text"
          name="countryOfBirth"
          value={countryOfBirth}
          onChange={(e) => setCountryOfBirth(e.target.value)}
          placeholder="Enter country of birth"
        />
        <button className="app-button" onClick={() => handleAddUser({ newName, newAge, bloodType, birthdate, countryOfBirth })}>
          Add User
        </button>
      </div>

      <div className="app-json-section">
        <h2>JSON Data</h2>
        <ul className="app-file-list">
          {jsonData.map((user) => (
            <li key={user.id}>
              ID: {user.id}, Name: {user.name}, Age: {user.age}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
