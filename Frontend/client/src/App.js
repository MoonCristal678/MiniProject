// App.js
import React, { useState} from 'react';
import './App.css';
import FileList from './Forms/fileList';
import WriteFileForm from './Forms/WriteFileForm';
import ReadFileForm from './Forms/ReadFileForm';
import DisplayUsers from './Forms/DisplayUsers';

function App() {
  const [readContent, setReadContent] = useState('');

  return (
    <div className="app-container">
      <h1 className="app-title">User Data and File Contents</h1>

      {/* Display user data using the new component */}
      <DisplayUsers />

      <WriteFileForm />

      <ReadFileForm setReadContent={setReadContent} />

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
