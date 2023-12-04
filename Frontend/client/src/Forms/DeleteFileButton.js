import React from 'react';
import DeleteButton from './DeleteButton';

const DeleteFileButton = ({ fileName, onDelete }) => {
  return (
    <DeleteButton
      url="delete"
      data={{ fileName }}
      onDelete={() => onDelete(fileName)}
      buttonText="Delete"
    />
  );
};

export default DeleteFileButton;
