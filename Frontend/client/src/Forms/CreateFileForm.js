// CreateFileForm.js
import React, { useState } from 'react';

const CreateFileForm = ({ onSubmit }) => {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleCreateFile = async () => {
    // Validation logic
    if (!fileName || !fileContent) {
      alert('Please enter both a file name and content.');
      return;
    }

    try {
      await onSubmit({ fileName, fileContent });
      // Additional logic if needed
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
      <button className="app-button" onClick={handleCreateFile}>
        Create File
      </button>
    </div>
  );
};

export default CreateFileForm;
