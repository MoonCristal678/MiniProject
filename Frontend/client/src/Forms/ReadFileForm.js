// forms/ReadFileForm.js

import React, { useState, useEffect } from 'react';
import { handleReadFile, getFileNames } from '../utils/apiUtils';

const ReadFileForm = ({ setReadContent }) => {
    const [readFileName, setReadFileName] = useState('');
    const [fileNames, setFileNames] = useState([]);

    useEffect(() => {
        // Fetch file names when the component mounts
        getFileNames(setFileNames);
    }, []);

    const handleRead = async () => {
        if (!readFileName) {
            alert('Please select a file.');
            return;
        }

        // Use handleReadFile function to read content
        handleReadFile(readFileName, setReadContent);
    };

    return (
        <div className="app-section">
            <h2>Read File</h2>
            <select
                name="readFileName"
                value={readFileName}
                onChange={(e) => setReadFileName(e.target.value)}
            >
                <option value="" disabled>Select a file</option>
                {fileNames.map((fileName) => (
                    <option key={fileName} value={fileName}>
                        {fileName}
                    </option>
                ))}
            </select>
            <button className="app-button" onClick={handleRead}>
                Read File
            </button>
            <div>
                {readContent && <pre className="app-file-content">{readContent}</pre>}
                {!readContent && <p className="app-file-not-found">File not found.</p>}
            </div>
        </div>
    );
};

export default ReadFileForm;
