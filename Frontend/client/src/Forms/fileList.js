import React, { useState } from 'react';
import DeleteFileButton from './DeleteFileButton';
import { useFetchData } from './sharedFunction';
const FileList = () => {



  const [files, setFiles] = useState([]);

  useFetchData('https://miniproject8-backend.onrender.com/v1/files', setFiles);


  const handleDeleteFile = (deletedFileName) => {

    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== deletedFileName));
  };

  return (
    <div className="app-section">
      <h2>File List</h2>
      <ul className="app-file-list">
        {files.map((file) => (
          <li key={file.name}>
            {file.name}
            <DeleteFileButton fileName={file.name} onDelete={handleDeleteFile} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
