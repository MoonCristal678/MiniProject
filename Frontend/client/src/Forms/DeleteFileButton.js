// DeleteFileButton.js

import React from 'react';

const DeleteFileButton = ({ fileName, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch('https://backend-j7qq.onrender.com/v1/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName }),
      });

      if (response.ok) {
        onDelete(fileName); // Callback to update the file list
      } else {
        console.error('Error deleting file:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <button className="app-delete-button" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteFileButton;
