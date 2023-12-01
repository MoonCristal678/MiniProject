import React, { useState, useEffect } from 'react';
import { fetchFileData, updateFile } from '../api';
import { fetchUserData, updateUser } from '../api';
import { handleSelectUser } from '../UserFunctionality/helpers';

const initialFileState = {
    name: '',
    content: '',
};

const initialUserState = {
    name: '',
    age: '',
    bloodType: '',
    birthdate: '',
    countryOfBirth: '',
};

const UpdateForm = ({ type }) => {
    const [selectedId, setSelectedId] = useState('');
    const [updatedData, setUpdatedData] = useState(
        type === 'file' ? initialFileState : initialUserState
    );
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = type === 'file' ? await fetchFileData() : await fetchUserData();
                setJsonData(data);
            } catch (error) {
                console.error(`Error fetching ${type} data:`, error);
            }
        };

        fetchData();
    }, [type]);

    const handleSelect = (e) => {
        const selectedId = e.target.value;
        setSelectedId(selectedId);

        const selectedData = jsonData.find((item) => item._id === selectedId);

        setUpdatedData(selectedData || (type === 'file' ? initialFileState : initialUserState));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const updateFunction = type === 'file' ? updateFile : updateUser;
            await updateFunction(selectedId, updatedData);

            // Reload the page after updating the data
            window.location.reload();
        } catch (error) {
            console.error(`Error updating ${type}:`, error);
        }
    };

    return (
        <div className="app-section">
            <h2>Update {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            <form onSubmit={handleUpdate}>
                <label htmlFor={`${type}Id`}>Select {type}:</label>
                <select id={`${type}Id`} value={selectedId} onChange={handleSelect} required>
                    <option value="" disabled>
                        Select {type}
                    </option>
                    {jsonData.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.name || item.username} (ID: {item._id})
                        </option>
                    ))}
                </select>
                <br />
                {Object.keys(updatedData)
                    .filter((field) => !['_id', '__v'].includes(field)) // Exclude specific fields
                    .map((field) => (
                        <React.Fragment key={field}>
                            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                            {field === 'content' ? (
                                <textarea
                                    id={field}
                                    value={updatedData[field]}
                                    onChange={(e) => setUpdatedData({ ...updatedData, [field]: e.target.value })}
                                    required
                                />
                            ) : (
                                <input
                                    type={field === 'age' ? 'number' : 'text'}
                                    id={field}
                                    value={updatedData[field]}
                                    onChange={(e) => setUpdatedData({ ...updatedData, [field]: e.target.value })}
                                    required
                                />
                            )}
                        </React.Fragment>


                    ))}
                <button type="submit">Update {type.charAt(0).toUpperCase() + type.slice(1)}</button>
            </form>
        </div>
    );
};

export const UpdateFileForm = () => <UpdateForm type="file" />;
export const UpdateUserForm = () => <UpdateForm type="user" />;
