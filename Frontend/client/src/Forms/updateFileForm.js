import React, { useState, useEffect } from 'react';
import { fetchFileData, updateFile } from '../api';

const UpdateFileForm = () => {
  const [selectedFileId, setSelectedFileId] = useState('');
  const [updatedFile, setUpdatedFile] = useState({
    name: '',
    content: '',
  });

  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetchJsonData();
  }, []);

  const fetchJsonData = async () => {
    try {
      const data = await fetchFileData();
      setJsonData(data);
    } catch (error) {
      console.error('Error fetching file data:', error);
    }
  };

  const handleSelectFile = (e) => {
    const selectedId = e.target.value;
    setSelectedFileId(selectedId);

    const selectedFile = jsonData.find((file) => file._id === selectedId);

    setUpdatedFile(selectedFile || { name: '', content: '' });
  };

  const handleUpdateFile = async (e) => {
    e.preventDefault();

    try {
      await updateFile(selectedFileId, updatedFile);

      // Reload the page after updating the file
      window.location.reload();
    } catch (error) {
      console.error('Error updating file:', error);
    }
  };

  return (
    <div className="app-section">
      <h2>Update File</h2>
      <form onSubmit={handleUpdateFile}>
        <label htmlFor="fileId">Select File:</label>
        <select id="fileId" value={selectedFileId} onChange={handleSelectFile} required>
          <option value="" disabled>Select file</option>
          {jsonData.map((file) => (
            <option key={file._id} value={file._id}>
              {file.name} (ID: {file._id})
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={updatedFile.name}
          onChange={(e) => setUpdatedFile({ ...updatedFile, name: e.target.value })}
          required
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={updatedFile.content}
          onChange={(e) => setUpdatedFile({ ...updatedFile, content: e.target.value })}
          required
        />

        <button type="submit">Update File</button>
      </form>
    </div>
  );
};

export default UpdateFileForm;
