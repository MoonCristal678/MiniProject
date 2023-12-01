// App.js
import React, { useState} from 'react';
import './App.css';
import FileList from './Forms/fileList';
import WriteFileForm from './Forms/WriteFileForm';
import ReadFileForm from './Forms/ReadFileForm';
import DisplayUsers from './Forms/DisplayUsers';
import UpdateUserForm from './Forms/UpdateUserForm';
import UpdateFileForm from './Forms/updateFileForm';
import AddUserForm from './Forms/AddUserForm';
function App() {
  const [readContent, setReadContent] = useState('');
  const handleDeleteUser = (deletedUserId) => {
    // Implement logic to update user list (e.g., refetch data, update state, etc.)
    // This function is called after a user is deleted
    console.log(`User '${deletedUserId}' deleted. Update user list logic here.`);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">User Data and File Contents</h1>

      {/* Display user data using the new component */}
      <DisplayUsers onDeleteUser={handleDeleteUser} />
      <AddUserForm />
      <UpdateUserForm/>
      <WriteFileForm />

      <ReadFileForm setReadContent={setReadContent} />
      <UpdateFileForm />
      <div className="app-section">
        <h2>Display File Content</h2>
        {readContent && <pre className="app-file-content">{readContent}</pre>}
        {!readContent && <p className="app-file-not-found">File not found.</p>}
      </div>

      <div>
        <FileList />
      </div>
     
    </div>
  );
}

export default App;
