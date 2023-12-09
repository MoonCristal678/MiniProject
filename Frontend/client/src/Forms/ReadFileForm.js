import React, { useState } from 'react';

const ReadFileForm = () => {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [error, setError] = useState(null);

  const handleReadFile = async () => {
    if (!fileName) {
      setError('Please enter a file name.');
      return;
    }

    try {
      const response = await fetch(`https://miniproject9-backend.onrender.com/v1/read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials
        body: JSON.stringify({ fileName }),
      });

      if (!response.ok) {
        const data = await response.text();
        setError(data || 'Error reading file.');
        setFileContent(''); // Clear file content on error
        return;
      }

      const htmlString = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const extractedContent = doc.querySelector('pre').textContent;

      setFileContent(extractedContent);
      setError(null);
    } catch (error) {
      console.error('Error reading file:', error);
      setError('Error reading file.');
    }
  };

  return (
    <div className="app-section" style={{ border: '2px solid black', padding: '10px', borderRadius: '10px' }}>
      <h2>Read File</h2>
      <input
        type="text"
        name="fileName"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Enter file name"
      />
      <button className="app-button" onClick={handleReadFile}>
        Read File
      </button>
      {error && <p className="app-error">{error}</p>}
      <p style={{ fontWeight: 'bold' }}>File Contents of {fileName}:</p>
      <pre style={{ border: '1px solid black', padding: '10px', borderRadius: '5px', backgroundColor: '#EAFFF1'}}>{fileContent}</pre>
    </div>
  );
};

export default ReadFileForm;
