// writeFile.js

import { fetchData } from './apiUtils';

export const handleCreateFile = async (fileName, fileContent, setCreatedFiles, setFileName, setFileContent) => {
  if (!fileName || !fileContent) {
    alert('Please enter both a file name and content.');
    return;
  }

  fetchData(
    'https://backend-j7qq.onrender.com/v1/write',
    'POST',
    { fileName, fileContent },
    (data) => {
      setCreatedFiles((prevFiles) => ({
        ...prevFiles,
        [fileName]: fileContent,
      }));
      setFileName('');
      setFileContent('');
    },
    (error) => {
      console.error('Error creating file:', error);
    }
  );
};
