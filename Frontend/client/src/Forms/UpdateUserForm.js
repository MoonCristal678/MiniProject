// UpdateUserForm.js
import React, { useState } from 'react';

const UpdateUserForm = ({ users, onSelectUser, onUpdateUser }) => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    age: '',
    bloodType: '',
    birthdate: '',
    countryOfBirth: '',
  });

  const handleSelectUser = (e) => {
    const selectedId = e.target.value;
    setSelectedUserId(selectedId);

    const selectedUser = users.find((user) => user._id === selectedId);
    setUpdatedUser(selectedUser || { name: '', age: '', bloodType: '', birthdate: '', countryOfBirth: '' });
  };

  const handleUpdateUser = async () => {
    try {
      await onUpdateUser(selectedUserId, updatedUser);
      setSelectedUserId('');
      setUpdatedUser({
        name: '',
        age: '',
        bloodType: '',
        birthdate: '',
        countryOfBirth: '',
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="app-section">
      <h3>Update User</h3>
      <label>
        Select User:
        <select className="app-button" onChange={handleSelectUser} value={selectedUserId}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={updatedUser.name}
          onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
        />
      </label>
      <br />
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={updatedUser.age}
          onChange={(e) => setUpdatedUser({ ...updatedUser, age: e.target.value })}
        />
      </label>
      <br />
      <label>
        Blood Type:
        <input
          type="text"
          name="bloodType"
          value={updatedUser.bloodType}
          onChange={(e) => setUpdatedUser({ ...updatedUser, bloodType: e.target.value })}
        />
      </label>
      <br />
      <label>
        Birthdate:
        <input
          type="date"
          name="birthdate"
          value={updatedUser.birthdate}
          onChange={(e) => setUpdatedUser({ ...updatedUser, birthdate: e.target.value })}
        />
      </label>
      <br />
      <label>
        Country of Birth:
        <input
          type="text"
          name="countryOfBirth"
          value={updatedUser.countryOfBirth}
          onChange={(e) => setUpdatedUser({ ...updatedUser, countryOfBirth: e.target.value })}
        />
      </label>
      <br />
      <button className="app-button" type="button" onClick={handleUpdateUser} disabled={!selectedUserId}>
        Update User
      </button>
    </div>
  );
};

export default UpdateUserForm;
