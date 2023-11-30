import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [readFileName, setReadFileName] = useState('');
  const [readContent, setReadContent] = useState('');
  const [createdFiles, setCreatedFiles] = useState({});
  const [jsonData, setJsonData] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');

  useEffect(() => {
    async function fetchJsonData() {
      try {
        const response = await fetch('https://backend-j7qq.onrender.com/v1/api/users'); // Update the URL as needed
        const data = await response.json();
        console.log(data);
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    }

    fetchJsonData();
  }, []);

  const handleCreateFile = async () => {
    if (!fileName || !fileContent) {
      alert('Please enter both a file name and content.');
      return;
    }

    try {
      await fetch('https://backend-j7qq.onrender.com/v1/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName, fileContent }),
      });
      setCreatedFiles((prevFiles) => ({
        ...prevFiles,
        [fileName]: fileContent,
      }));
      setFileName('');
      setFileContent('');
    } catch (error) {
      console.error('Error creating file:', error);
    }
  };

  const handleReadFile = async () => {
    if (!readFileName) {
      alert('Please enter a file name.');
      return;
    }
  
    try {
      const response = await fetch(`https://backend-j7qq.onrender.com/v1/read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName: readFileName }),
      });
      const data = await response.text();
      setReadContent(data.replace(/<\/?[^>]+(>|$)/g, ""));
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };
  
  

  const handleDeleteFile = async (fileName) => {
    try {
      await fetch(`https://backend-j7qq.onrender.com/v1/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName }),
      });
      const updatedFiles = { ...createdFiles };
      delete updatedFiles[fileName];
      setCreatedFiles(updatedFiles);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleAddUser = async () => {
    if (!newName || !newAge) {
      alert('Please enter both a name and age.');
      return;
    }

    try {
      const newUser = {
        name: newName,
        age: newAge,
      };
      await fetch('https://backend-j7qq.onrender.com/v1/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      setJsonData((prevData) => [...prevData, newUser]);
      setNewName('');
      setNewAge('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Welcome to the File Operations Page</h1>

      <div className="app-section">
        <h2>Create File</h2>
        <input
          type="text"
          name="fileName"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Enter file name"
        />
        <textarea
          name="fileContent"
          value={fileContent}
          onChange={(e) => setFileContent(e.target.value)}
          placeholder="Enter file content"
        />
        <button className="app-button" onClick={handleCreateFile}>
          Create File
        </button>
      </div>

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
          {readContent && <pre className="app-file-content">{readContent}</pre>}
          {!readContent && <p className="app-file-not-found">File not found.</p>}
        </div>
      </div>

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
        <button className="app-button" onClick={handleAddUser}>
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