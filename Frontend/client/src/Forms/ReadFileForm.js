// Forms/ReadFileForm.js
import React, { useState } from 'react';

const ReadFileForm = ({ setReadContent }) => {
  const [readFileName, setReadFileName] = useState('');
  const [error, setError] = useState(null);

  const handleReadFile = async () => {
    if (!readFileName) {
        setError('Please enter a file name.');
        setReadContent('');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/v1/read`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName: readFileName }),
        });

        if (!response.ok) {
            const data = await response.json();
            if (response.status === 404) {
                setError(null); // Clear error for not found
                setReadContent(''); // Clear content when not found
            } else {
                setError(data.error || 'Error reading file.');
                setReadContent('');
            }
            return;
        }

        const data = await response.text();
        setReadContent(data.replace(/<\/?[^>]+(>|$)/g, ''));
        setError(null);
    } catch (error) {
        console.error('Error reading file:', error);
        setError('Error reading file.');
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
      {error && <p className="app-error">{error}</p>}
    </div>
  );
};

export default ReadFileForm;
