// WriteFileForm.js

import React, { useState } from 'react';

const WriteFileForm = () => {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleWriteFile = async () => {
    if (!fileName || !fileContent) {
      alert('Please enter both a file name and content.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/v1/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName, fileContent }),
      });

      if (response.ok) {
        alert(`File '${fileName}' created with the provided content.`);
        setFileName('');
        setFileContent('');

        // Reload the page to update the file list
        window.location.reload();
      } else {
        console.error('Error creating file:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating file:', error);
    }
  };

  return (
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
      <button className="app-button" onClick={handleWriteFile}>
        Create File
      </button>
    </div>
  );
};

export default WriteFileForm;
