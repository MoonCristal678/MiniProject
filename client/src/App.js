import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // State variables for file operations
      fileName: '',
      fileContent: '',
      readFileName: '',
      readContent: '',
      createdFiles: {},
      jsonData: [], // To store the JSON data

      // State variables for adding users to JSON data
      newName: '', // New user name
      newAge: '',  // New user age
    };
  }

  componentDidMount() {
    // Fetch JSON data when the component mounts
    this.fetchJsonData();
  }

  // Function to fetch JSON data from the server
  fetchJsonData = async () => {
    try {
      // Make an API request to fetch JSON data
      const response = await fetch('http://localhost:3000/v1/api/users'); // Update the URL as needed
      const data = await response.json();
      this.setState({ jsonData: data });
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  // Event handler for creating a file
  handleCreateFile = () => {
    const { fileName, fileContent, createdFiles } = this.state;

    if (!fileName || !fileContent) {
      // Display an alert if file name or content is missing
      alert('Please enter both a file name and content.');
      return;
    }

    // Update the list of created files
    const updatedFiles = { ...createdFiles };
    updatedFiles[fileName] = fileContent;

    this.setState({
      createdFiles: updatedFiles,
      fileName: '',
      fileContent: '',
    });
  };

  // Event handler for reading a file
  handleReadFile = () => {
    const { readFileName, createdFiles } = this.state;

    if (readFileName in createdFiles) {
      // Display the file content if found
      this.setState({ readContent: createdFiles[readFileName] });
    } else {
      // Display a message if the file is not found
      this.setState({ readContent: 'File not found.' });
    }
  };

  // Event handler for deleting a file
  handleDeleteFile = (fileName) => {
    const { createdFiles } = this.state;

    if (fileName in createdFiles) {
      // Delete the file from the list of created files
      const updatedFiles = { ...createdFiles };
      delete updatedFiles[fileName];

      this.setState({ createdFiles: updatedFiles });
    }
  };

  // Event handler for input changes
  handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the corresponding state variable based on user input
    this.setState({ [name]: value });
  };

  // Function to add a new user to the JSON data
  handleAddUser = () => {
    const { jsonData, newName, newAge } = this.state;

    // Ensure both name and age are provided
    if (!newName || !newAge) {
      // Display an alert if name or age is missing
      alert('Please enter both a name and age.');
      return;
    }

    // Create a new user object
    const newUser = {
      id: jsonData.length + 1, // You can use a more appropriate ID generation logic
      name: newName,
      age: newAge,
    };

    // Update the JSON data with the new user
    this.setState((prevState) => ({
      jsonData: [...prevState.jsonData, newUser],
      newName: '',
      newAge: '',
    }));
  };

  render() {
    const {
      fileName,
      fileContent,
      readFileName,
      readContent,
      createdFiles,
      newName,
      newAge,
      jsonData,
    } = this.state;

    return (
      <div className="app-container">
        <h1 className="app-title">Welcome to the File Operations Page</h1>

        <div className="app-section">
          <h2>Create File</h2>
          <input
            type="text"
            name="fileName"
            value={fileName}
            onChange={this.handleInputChange}
            placeholder="Enter file name"
          />
          <textarea
            name="fileContent"
            value={fileContent}
            onChange={this.handleInputChange}
            placeholder="Enter file content"
          />
          <button className="app-button" onClick={this.handleCreateFile}>
            Create File
          </button>
        </div>

        <div className="app-section">
          <h2>Read File</h2>
          <input
            type="text"
            name="readFileName"
            value={readFileName}
            onChange={this.handleInputChange}
            placeholder="Enter file name"
          />
          <button className="app-button" onClick={this.handleReadFile}>
            Read File
          </button>
          <div>
            {readContent && <pre className="app-file-content">{readContent}</pre>}
            {!readContent && <p className="app-file-not-found">{this.state.readContent}</p>}
          </div>
        </div>

        <div className="app-section">
          <h2>Created Files</h2>
          <ul className="app-file-list">
            {Object.keys(createdFiles).map((fileName) => (
              <li key={fileName}>
                {fileName}
                <button className="app-delete-button" onClick={() => this.handleDeleteFile(fileName)}>
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
            onChange={this.handleInputChange}
            placeholder="Enter name"
          />
          <input
            type="text"
            name="newAge"
            value={newAge}
            onChange={this.handleInputChange}
            placeholder="Enter age"
          />
          <button className="app-button" onClick={this.handleAddUser}>
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
}

export default App;