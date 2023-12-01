import React from 'react';
import FileForm from './FileForm';

const ReadFileForm = ({ setReadContent }) => (
  <FileForm type="read" onSubmit={setReadContent} />
);

export default ReadFileForm;