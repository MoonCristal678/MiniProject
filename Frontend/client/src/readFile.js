// readFile.js

import { fetchData } from './apiUtils';

export const handleReadFile = async (fileName, setReadContent) => {
  if (!fileName) {
    alert('Please enter a file name.');
    return;
  }

  fetchData(
    'https://backend-j7qq.onrender.com/v1/read',
    'POST',
    { fileName },
    (data) => {
      setReadContent(data.replace(/<\/?[^>]+(>|$)/g, ''));
    },
    (error) => {
      console.error('Error reading file:', error);
    }
  );
};
