// AddUserForm.js
import React, { useState } from 'react';

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
      const response = await fetch('http://localhost:3000/v1/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

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
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
          required
        />

        <label htmlFor="bloodType">Blood Type:</label>
        <input
          type="text"
          id="bloodType"
          value={newUser.bloodType}
          onChange={(e) => setNewUser({ ...newUser, bloodType: e.target.value })}
          required
        />

        <label htmlFor="birthdate">Birthdate:</label>
        <input
          type="date"
          id="birthdate"
          value={newUser.birthdate}
          onChange={(e) => setNewUser({ ...newUser, birthdate: e.target.value })}
          required
        />

        <label htmlFor="countryOfBirth">Country of Birth:</label>
        <input
          type="text"
          id="countryOfBirth"
          value={newUser.countryOfBirth}
          onChange={(e) => setNewUser({ ...newUser, countryOfBirth: e.target.value })}
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
