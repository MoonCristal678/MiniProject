import React from 'react';

const DeleteButton = ({ url, data, onDelete, buttonText }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/v1/${url}`, {
        method: 'POST',
        credentials: 'include', // Include credentials if needed
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the data in the request body
      });

      if (response.ok) {
        // Callback to update the list in the parent component
        onDelete();
      } else {
        console.error(`Error deleting ${url}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error deleting ${url}:`, error);
    }
  };

  return (
    <button className="app-delete-button" onClick={handleDelete}>
      {buttonText}
    </button>
  );
};

export default DeleteButton;
