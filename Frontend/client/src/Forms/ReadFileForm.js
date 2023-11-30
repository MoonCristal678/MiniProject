// forms/ReadFileForm.js

import React, { useState } from 'react';
import { handleReadFile } from '../utils/apiUtils';

const ReadFileForm = ({ setReadContent }) => {
  const [readFileName, setReadFileName] = useState('');

  const handleRead = async () => {
    if (!readFileName) {
      alert('Please enter a file name.');
      return;
    }

    handleReadFile(readFileName, setReadContent);
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
      <button className="app-button" onClick={handleRead}>
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
