import React, { useState, useEffect } from 'react';
import './App.css';
import FileList from './Forms/fileList';
import WriteFileForm from './Forms/WriteFileForm';
function App() {
  const [jsonData, setJsonData] = useState([]);
  const [readFileName, setReadFileName] = useState('');
  const [readContent, setReadContent] = useState('');

  useEffect(() => {
    async function fetchJsonData() {
      try {
        const response = await fetch('http://localhost:3001/v1/api/users'); // Update the port as needed
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    }

    fetchJsonData();
  }, []);

  const handleReadFile = async () => {
    if (!readFileName) {
      alert('Please enter a file name.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/v1/read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName: readFileName }),
      });
      const data = await response.text();
      setReadContent(data.replace(/<\/?[^>]+(>|$)/g, ''));
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

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
      <WriteFileForm/>
      <div className="app-section">
        <h2>Read File</h2>
        <input
          type="text"
          name="readFileName"
          value={readFileName}
          onChange={(e) => setReadFileName(e.target.value)}
          placeholder="Enter file name"
        />
        <button className="app-button" onClick={handleReadFile}>
          Read File
        </button>
        <div>
        <FileList />
       
          {readContent && <pre className="app-file-content">{readContent}</pre>}
          {!readContent && <p className="app-file-not-found">File not found.</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
