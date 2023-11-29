// AddUserForm.js
import React, { useState } from 'react';

const AddUserForm = ({ onSubmit }) => {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newBloodType, setNewBloodType] = useState('');
  const [newBirthdate, setNewBirthdate] = useState('');
  const [newCountryOfBirth, setNewCountryOfBirth] = useState('');

  const handleAddUser = async () => {
    // Validation logic
    if (!newName || !newAge) {
      alert('Please enter both a name and age.');
      return;
    }

    try {
      const newUser = {
        name: newName,
        age: newAge,
        bloodType: newBloodType,
        birthdate: newBirthdate,
        countryOfBirth: newCountryOfBirth,
      };
      await onSubmit(newUser);
      setNewName('');
      setNewAge('');
      setNewBloodType('');
      setNewBirthdate('');
      setNewCountryOfBirth('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="app-section">
      <h2>Add User to JSON Data</h2>
      <label>
        Name:
        <input
          type="text"
          name="newName"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter name"
        />
      </label>
      <label>
        Age:
        <input
          type="text"
          name="newAge"
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
          placeholder="Enter age"
        />
      </label>
      <label>
        Blood Type:
        <input
          type="text"
          name="newBloodType"
          value={newBloodType}
          onChange={(e) => setNewBloodType(e.target.value)}
          placeholder="Enter blood type"
        />
      </label>
      <label>
        Birthdate:(format: yyyy-mm-dd)
        <input
          type="text"
          name="newBirthdate"
          value={newBirthdate}
          onChange={(e) => setNewBirthdate(e.target.value)}
          placeholder="Enter birthdate"
        />
      </label>
      <label>
        Country of Birth:
        <input
          type="text"
          name="newCountryOfBirth"
          value={newCountryOfBirth}
          onChange={(e) => setNewCountryOfBirth(e.target.value)}
          placeholder="Enter country of birth"
        />
      </label>
      <button className="app-button" onClick={handleAddUser}>
        Add User
      </button>
    </div>
  );
};

export default AddUserForm;
