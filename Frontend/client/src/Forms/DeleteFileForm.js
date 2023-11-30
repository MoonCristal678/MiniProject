// forms/DeleteFileForm.js

import React, { useState } from 'react';
import { handleDeleteFile } from '../utils/apiUtils';

const DeleteFileForm = ({ setCreatedFiles }) => {
  const [fileName, setFileName] = useState('');

  const handleDelete = async () => {
    if (!fileName) {
      alert('Please enter a file name.');
      return;
    }

    handleDeleteFile(fileName, setCreatedFiles);
  };

  return (
    <div className="app-section">
      <h2>Delete File</h2>
      <input
        type="text"
        name="fileName"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Enter file name"
      />
      <button className="app-button" onClick={handleDelete}>
        Delete File
      </button>
    </div>
  );
};

export default DeleteFileForm;
