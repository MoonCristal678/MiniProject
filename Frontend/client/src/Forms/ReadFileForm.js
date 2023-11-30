// ReadFileForm.js

import React, { useState } from 'react';

const ReadFileForm = ({ setReadContent }) => {
  const [readFileName, setReadFileName] = useState('');

  const handleReadFile = async () => {
    try {
      const response = await fetch(`http://localhost:3001/v1/read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName: readFileName }),
      });

      const data = await response.json();

      if (response.ok) {
        setReadContent(data.content.replace(/<\/?[^>]+(>|$)/g, ''));
      } else {
        console.error('Error reading file:', data.message);
        setReadContent('');
      }
    } catch (error) {
      console.error('Error reading file:', error);
      setReadContent('');
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
    </div>
  );
};

export default ReadFileForm;
