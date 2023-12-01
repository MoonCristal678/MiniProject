import React, { useState, useEffect } from 'react';
import { fetchUserData, updateUser } from '../api';
import { handleSelectUser } from './helpers';

const initialUserState = {
  name: '',
  age: '',
  bloodType: '',
  birthdate: '',
  countryOfBirth: '',
};

const UpdateUserForm = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [updatedUser, setUpdatedUser] = useState(initialUserState);
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetchJsonData();
  }, []);

  const fetchJsonData = async () => {
    try {
      const data = await fetchUserData();
      setJsonData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const updatedUserData = isAllFieldsEmpty(updatedUser)
        ? { delete: true }
        : updatedUser;

      await updateUser(selectedUserId, updatedUserData);

      window.location.reload();
      fetchJsonData();
      clearForm();
    } catch (error) {
      console.error('Error updating/deleting user:', error);
    }
  };

  const isAllFieldsEmpty = (user) => {
    return Object.values(user).every((value) => value === '');
  };

  const clearForm = () => {
    setSelectedUserId('');
    setUpdatedUser(initialUserState);
  };

  return (
    <div className="app-section">
      <h2>Update User</h2>
      <form onSubmit={handleUpdateUser}>
        <label htmlFor="userId">Select User:</label>
        <select
          value={selectedUserId}
          onChange={(e) => handleSelectUser(e, jsonData, setSelectedUserId, setUpdatedUser)}
          required
        >
          <option value="" disabled>
            Select user
          </option>
          {jsonData.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} (ID: {user._id})
            </option>
          ))}
        </select>

        {['name', 'age', 'bloodType', 'birthdate', 'countryOfBirth'].map((field) => (
          <React.Fragment key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type={field === 'age' ? 'number' : 'text'}
              id={field}
              value={updatedUser[field]}
              onChange={(e) => setUpdatedUser({ ...updatedUser, [field]: e.target.value })}
              required
            />
          </React.Fragment>
        ))}

        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
