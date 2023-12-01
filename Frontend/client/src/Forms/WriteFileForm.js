import React from 'react';
import FileForm from './FileForm';

const WriteFileForm = () => <FileForm type="write" onSubmit={() => window.location.reload()} />;

export default WriteFileForm;