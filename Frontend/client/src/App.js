// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import FileList from './Forms/fileList';
import WriteFileForm from './Forms/WriteFileForm';
import ReadFileForm from './Forms/ReadFileForm';

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [readContent, setReadContent] = useState('');

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
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">User Data and File Contents</h1>

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

      <WriteFileForm />

      <ReadFileForm setReadContent={setReadContent} />

      
        <div className="app-section">
        <h2>Display File Content</h2>
          {readContent && <pre className="app-file-content">{readContent}</pre>}
          {!readContent && <p className="app-file-not-found">File not found.</p>}
        </div>
        <div>
          <FileList/>
        </div>
      </div>
    
  );
}

export default App;
