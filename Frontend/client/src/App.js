import React, { useState} from 'react';
import './App.css';
import FileList from './Forms/fileList';
import WriteFileForm from './Forms/WriteFileForm';
import ReadFileForm from './Forms/ReadFileForm';
import DisplayUsers from './Forms/DisplayUsers';


import AddUserForm from './Forms/AddUserForm';
import { UpdateFileForm, UpdateUserForm } from './Forms/ReusableForm';
function App() {
  const [readContent, setReadContent] = useState('');
  const handleDeleteUser = (deletedUserId) => {
    
    console.log(`User '${deletedUserId}' deleted. Update user list logic here.`);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">User Data and File Contents</h1>

      <DisplayUsers onDeleteUser={handleDeleteUser} />
      <AddUserForm />
      <UpdateUserForm/>
      <WriteFileForm />

      <ReadFileForm setReadContent={setReadContent} />
     
      {readContent && (
        <div className="app-section">
          <h2>Read Content</h2>
          <p>{readContent}</p>
        </div>
      )}
      <div>
        <FileList />
      </div>
      <UpdateFileForm />
     

      
     
    </div>
  );
}

export default App;
