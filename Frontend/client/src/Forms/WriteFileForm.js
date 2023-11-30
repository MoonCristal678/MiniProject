// forms/WriteFileForm.js

import React, { useState } from 'react';
import { handleCreateFile } from '../utils/apiUtils';

const WriteFileForm = ({ setCreatedFiles, setFileName, setFileContent }) => {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleCreate = async () => {
    if (!fileName || !fileContent) {
      alert('Please enter both a file name and content.');
      return;
    }

    handleCreateFile(fileName, fileContent, setCreatedFiles, setFileName, setFileContent);
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
      <button className="app-button" onClick={handleCreate}>
        Create File
      </button>
    </div>
  );
};

export default WriteFileForm;
