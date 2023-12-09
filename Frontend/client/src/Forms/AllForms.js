import React from 'react';
import { useParams } from 'react-router-dom';
import WriteFileForm from './WriteFileForm';
import ReadFileForm from './ReadFileForm';
import DisplayUsers from './DisplayUsers';
import AddUserForm from './AddUserForm';
import { UpdateFileForm, UpdateUserForm } from './ReusableForm';
import FileList from './fileList';
import LogoutButton from './LogoutButton';

const AllForms = () => {
  const { username } = useParams();
  const handleFileSubmit = (fileData) => {
    console.log('File submitted:', fileData);
   
  };
  return (
    <div className="all-forms-container">
      <h2 style={{ color: '#556b2f', textAlign: 'center', border: '2px solid #8b4513', padding: '10px', borderRadius: '5px', backgroundColor: '#ffdab9' }}>
        Welcome to File and User Documentation Operations!
      </h2>
      <LogoutButton />

      <DisplayUsers />
      <AddUserForm />
      <UpdateUserForm />
      <FileList/>
      <WriteFileForm />
      <ReadFileForm type="read" onSubmit={handleFileSubmit} />
      <UpdateFileForm />
   
    </div>
  );
};

export default AllForms;
