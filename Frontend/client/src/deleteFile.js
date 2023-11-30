// deleteFile.js

import { fetchData } from './apiUtils';

export const handleDeleteFile = async (fileName, setCreatedFiles) => {
  fetchData(
    'https://backend-j7qq.onrender.com/v1/delete',
    'POST',
    { fileName },
    () => {
      const updatedFiles = { ...createdFiles };
      delete updatedFiles[fileName];
      setCreatedFiles(updatedFiles);
    },
    (error) => {
      console.error('Error deleting file:', error);
    }
  );
};
