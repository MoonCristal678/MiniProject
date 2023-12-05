import React from 'react';
import DeleteButton from './DeleteButton';

const DeleteUserButton = ({ userId, onDelete }) => {
  return (
    <DeleteButton
      url="deleteUser"
      data={{ userId }}
      onDelete={() => onDelete(userId)}
      buttonText="Delete User"
    />
  );
};

export default DeleteUserButton;
