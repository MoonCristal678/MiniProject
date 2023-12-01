import React, { useState } from 'react';
import { addUser } from '../api';

const AddUserForm = ({ onAddUser }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    age: '',
    bloodType: '',
    birthdate: '',
    countryOfBirth: '',
  });

  const handleInputChange = (field, value) => {
    setNewUser({ ...newUser, [field]: value });
  };

  const handleAddUser = async () => {
    try {
      window.location.reload();
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

  const renderInput = (id, label, type = 'text') => (
    <>
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        id={id}
        value={newUser[id]}
        onChange={(e) => handleInputChange(id, e.target.value)}
        required
      />
    </>
  );

  return (
    <div className="app-section">
      <h2>Add User</h2>
      <form>
        {renderInput('name', 'Name')}
        {renderInput('age', 'Age', 'number')}
        {renderInput('bloodType', 'Blood Type')}
        {renderInput('birthdate', 'Birthdate', 'date')}
        {renderInput('countryOfBirth', 'Country of Birth')}

        <button type="button" onClick={handleAddUser}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
