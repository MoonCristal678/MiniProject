import React, { useState, useEffect } from 'react';
import { fetchUserData, updateUser } from './api'; 
import { handleSelectUser } from './helpers'; 

const UpdateUserForm = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    age: '',
    bloodType: '',
    birthdate: '',
    countryOfBirth: '',
  });

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
      if (isAllFieldsEmpty(updatedUser)) {
        await updateUser(selectedUserId, { delete: true });
      } else {
        await updateUser(selectedUserId, updatedUser);
      }

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
    setUpdatedUser({
      name: '',
      age: '',
      bloodType: '',
      birthdate: '',
      countryOfBirth: '',
    });
  };

  return (
    <div className="app-section">
      <h2>Update User</h2>
      <form onSubmit={handleUpdateUser}>
        <label htmlFor="userId">Select User:</label>
        <select
          id="userId"
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

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={updatedUser.name}
          onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={updatedUser.age}
          onChange={(e) => setUpdatedUser({ ...updatedUser, age: e.target.value })}
          required
        />

        <label htmlFor="bloodType">Blood Type:</label>
        <input
          type="text"
          id="bloodType"
          value={updatedUser.bloodType}
          onChange={(e) => setUpdatedUser({ ...updatedUser, bloodType: e.target.value })}
          required
        />

        <label htmlFor="birthdate">Birthdate:</label>
        <input
          type="date"
          id="birthdate"
          value={updatedUser.birthdate}
          onChange={(e) => setUpdatedUser({ ...updatedUser, birthdate: e.target.value })}
          required
        />

        <label htmlFor="countryOfBirth">Country of Birth:</label>
        <input
          type="text"
          id="countryOfBirth"
          value={updatedUser.countryOfBirth}
          onChange={(e) => setUpdatedUser({ ...updatedUser, countryOfBirth: e.target.value })}
          required
        />

        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
