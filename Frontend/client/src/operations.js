import React, { useState, useEffect } from 'react';
import './App.css';
import Workout from './Workout';
import Nutrition from './Nutrition';
import Goal from './Goal';

function FileOperations() {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [readFileName, setReadFileName] = useState('');
  const [readContent, setReadContent] = useState('');
  const [createdFiles, setCreatedFiles] = useState({});
  const [jsonData, setJsonData] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newBloodType, setNewBloodType] = useState('');
  const [newBirthdate, setNewBirthdate] = useState('');
  const [newCountryOfBirth, setNewCountryOfBirth] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    age: '',
    bloodType: ' ',
    birthdate: ' ',
    countryOfBirth: ' ',
  });
  const fetchJsonData = async () => {
    try {
      const response = await fetch('https://miniproject9-backend.onrender.com/v1/api/users'); // Update the URL as needed
      const data = await response.json();
      console.log(data);
      setJsonData(data);
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  useEffect(() => {
    fetchJsonData();
  }, []);

  const handleCreateFile = async () => {
    if (!fileName || !fileContent) {
      alert('Please enter both a file name and content.');
      return;
    }

    try {
      await fetch('https://miniproject9-backend.onrender.com/v1/write', {
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
      const response = await fetch(`https://miniproject9-backend.onrender.com/v1/read`, {
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
      await fetch(`https://miniproject9-backend.onrender.com/v1/delete`, {
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
        bloodType: newBloodType,
        birthdate: newBirthdate,
        countryOfBirth: newCountryOfBirth,
      };
      await fetch('https://miniproject9-backend.onrender.com/v1/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      setJsonData((prevData) => [...prevData, newUser]);
      setNewName('');
      setNewAge('');
      setNewBloodType('');
      setNewBirthdate('');
      setNewCountryOfBirth('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };


  const handleSelectUser = (e) => {
    const selectedId = e.target.value;
    setSelectedUserId(selectedId);

    const selectedUser = jsonData.find((user) => user._id === selectedId);


    setUpdatedUser(selectedUser || { name: '', age: '' });
  };

  const handleUpdateUser = async () => {
    try {
      await fetch(`https://miniproject9-backend.onrender.com/v1/updateUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUserId,
          name: updatedUser.name,
          age: updatedUser.age,
          bloodType: updatedUser.bloodType,
          birthdate: updatedUser.birthdate,
          countryOfBirth: updatedUser.countryOfBirth,
        }),
      });


      fetchJsonData();


      setSelectedUserId('');
      setUpdatedUser({
        name: '',
        age: '',
        bloodType: ' ',
        birthdate: ' ',
        countryOfBirth: ' ',
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`https://miniproject9-backend.onrender.com/v1/deleteUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      fetchJsonData();
    } catch (error) {
      console.error('Error deleting user:', error);
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
        <input
          type="text"
          name="newBloodType"
          value={newBloodType}
          onChange={(e) => setNewBloodType(e.target.value)}
          placeholder="Enter blood type"
        />
        <input
          type="text"
          name="newBirthdate"
          value={newBirthdate}
          onChange={(e) => setNewBirthdate(e.target.value)}
          placeholder="Enter birthdate"
        />
        <input
          type="text"
          name="newCountryOfBirth"
          value={newCountryOfBirth}
          onChange={(e) => setNewCountryOfBirth(e.target.value)}
          placeholder="Enter country of birth"
        />
        <button className="app-button" onClick={handleAddUser}>
          Add User
        </button>
      </div>

      <div className="app-section">
        <h3>Update User</h3>
        <label>
          Select User:
          <select className="app-button" onChange={handleSelectUser} value={selectedUserId}>
            <option value="">Select User</option>
            {jsonData.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={updatedUser.age}
            onChange={(e) => setUpdatedUser({ ...updatedUser, age: e.target.value })}
          />
        </label>
        <br />
        <label>
          Blood Type:
          <input
            type="text"
            name="bloodType"
            value={updatedUser.bloodType}
            onChange={(e) => setUpdatedUser({ ...updatedUser, bloodType: e.target.value })}
          />
        </label>
        <br />
        <label>
          Birthdate:
          <input
            type="date"
            name="birthdate"
            value={updatedUser.birthdate}
            onChange={(e) => setUpdatedUser({ ...updatedUser, birthdate: e.target.value })}
          />
        </label>
        <br />
        <label>
          Country of Birth:
          <input
            type="text"
            name="countryOfBirth"
            value={updatedUser.countryOfBirth}
            onChange={(e) => setUpdatedUser({ ...updatedUser, countryOfBirth: e.target.value })}
          />
        </label>
        <br />
        <button className="app-button" type="button" onClick={handleUpdateUser} disabled={!selectedUserId}>
          Update User
        </button>
      </div>

      <div className="app-json-section">
        <h2>JSON Data</h2>
        <ul className="app-file-list">
          {jsonData.map((user) => (
            <li key={user._id}>
              Name: {user.name}, Age: {user.age}, Blood Type: {user.bloodType}, Birthdate: {user.birthdate}, Country of Birth: {user.countryOfBirth}
              <button className="app-delete-button" onClick={() => handleDeleteUser(user._id)}>
                Delete User
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Workout />
      <Nutrition />
      <Goal />
    </div>
  );
}

export default FileOperations;
