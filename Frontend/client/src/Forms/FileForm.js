import React, { useState } from 'react';

const FileForm = ({ type, onSubmit }) => {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [error, setError] = useState(null);

  const handleFileOperation = async () => {
    if (!fileName || (type === 'write' && !fileContent)) {
      setError(`Please enter ${type === 'read' ? 'a' : 'both'} file name and content.`);
      return;
    }
  
    try {
      const endpoint = type === 'read' ? 'read' : 'write';
      const response = await fetch(`http://localhost:3000/v1/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials
        body: JSON.stringify({ fileName, fileContent }),
      });
  
      if (!response.ok) {
        const data = await response.text(); // Assume response is text (HTML error page)
        setError(data || `Error ${type === 'read' ? 'reading' : 'writing'} file.`);
        return;
      }
  
      if (type === 'read') {
        const data = await response.text(); // Assume response is text
        onSubmit && typeof onSubmit === 'function' && onSubmit(data);
      } else {
        alert(`File '${fileName}' ${type === 'read' ? 'read' : 'created'} with the provided content.`);
        setFileName('');
        setFileContent('');
        if (onSubmit && typeof onSubmit === 'function') {
          onSubmit();
        }
      }
  
      setError(null);
    } catch (error) {
      console.error(`Error ${type === 'read' ? 'reading' : 'writing'} file:`, error);
      setError(`Error ${type === 'read' ? 'reading' : 'writing'} file.`);
    }
  };
  return (
    <div className="app-section">
      <h2>{type === 'read' ? 'Read' : 'Create'} File</h2>
      <input
        type="text"
        name="fileName"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Enter file name"
      />
      {type === 'write' && (
        <textarea
          name="fileContent"
          value={fileContent}
          onChange={(e) => setFileContent(e.target.value)}
          placeholder="Enter file content"
        />
      )}
      <button className="app-button" onClick={handleFileOperation}>
        {type === 'read' ? 'Read' : 'Create'} File
      </button>
      {error && <p className="app-error">{error}</p>}
    </div>
  );
};

export default FileForm;
