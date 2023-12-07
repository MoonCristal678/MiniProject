import React, { useState, useEffect } from 'react';
import DeleteFileButton from './DeleteFileButton';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://miniproject10-backend.onrender.com/v1/files", {
          credentials: 'include', // Include credentials (session cookie)
        });
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteFile = (deletedFileName) => {
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
