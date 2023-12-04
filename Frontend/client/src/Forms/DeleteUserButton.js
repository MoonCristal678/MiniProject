import React from 'react';

const DeleteUserButton = ({ userId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/v1/deleteUser`, {
        method: 'POST',
        credentials: 'include', // Include credentials if needed
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), // Send the userId in the request body
      });

      if (response.ok) {
        // Callback to update the user list or handle the deletion in your component
        onDelete(userId);
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <button className="app-delete-button" onClick={handleDelete}>
      Delete User
    </button>
  );
};

export default DeleteUserButton;
