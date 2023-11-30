// FileList.js

import React, { useState, useEffect } from 'react';
import DeleteFileButton from './DeleteFileButton';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch the file list from the server
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:3001/v1/files');
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error('Error fetching file list:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleDeleteFile = (deletedFileName) => {
    // Update the file list after deleting a file
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== deletedFileName));
  };

  return (
    <div className="app-section">
      <h2>File List</h2>
      <ul className="app-file-list">
        {files.map((file) => (
          <li key={file.name}>
            {file.name}
            <DeleteFileButton fileName={file.name} onDelete={handleDeleteFile} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
