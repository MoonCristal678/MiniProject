import React, { useState } from 'react';
import { fetchUserData, addUser } from '../api';

const InputField = ({ label, id, type, value, onChange, required }) => (
  <>
    <label htmlFor={id}>{label}:</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange({ ...value, [id]: e.target.value })}
      required={required}
    />
  </>
);

const AddUserForm = ({ onAddUser }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    age: '',
    bloodType: '',
    birthdate: '',
    countryOfBirth: '',
  });

  const handleAddUser = async () => {
    try {
      const response = await addUser(newUser);

      if (response.ok) {
        // Reload the page after adding the user
        window.location.reload();
      } else {
        console.error('Error adding user:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="app-section">
      <h2>Add User</h2>
      <form>
        <InputField
          label="Name"
          id="name"
          type="text"
          value={newUser}
          onChange={setNewUser}
          required
        />

        <InputField
          label="Age"
          id="age"
          type="number"
          value={newUser}
          onChange={setNewUser}
          required
        />

        <InputField
          label="Blood Type"
          id="bloodType"
          type="text"
          value={newUser}
          onChange={setNewUser}
          required
        />

        <InputField
          label="Birthdate"
          id="birthdate"
          type="date"
          value={newUser}
          onChange={setNewUser}
          required
        />

        <InputField
          label="Country of Birth"
          id="countryOfBirth"
          type="text"
          value={newUser}
          onChange={setNewUser}
          required
        />

        <button type="button" onClick={handleAddUser}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
