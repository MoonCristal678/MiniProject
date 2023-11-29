// ReadFileForm.js
import React, { useState } from 'react';

const ReadFileForm = ({ onSubmit }) => {
  const [readFileName, setReadFileName] = useState('');
  const [readContent, setReadContent] = useState('');

  const handleReadFile = async () => {
    // Validation logic
    if (!readFileName) {
      alert('Please enter a file name.');
      return;
    }

    try {
      const data = await onSubmit(readFileName);
      setReadContent(data.replace(/<\/?[^>]+(>|$)/g, ""));
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  return (
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
  );
};

export default ReadFileForm;
