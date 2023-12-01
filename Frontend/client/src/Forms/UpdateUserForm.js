import React, { useState, useEffect } from 'react';

const UpdateUserForm = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    age: '',
    bloodType: '',
    birthdate: '',
    countryOfBirth: '',
  });

  // Assuming jsonData is your array of users, make sure to replace it with your actual user data source
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    // Call your function to fetch user data
    fetchJsonData();
  }, []);

  const fetchJsonData = async () => {
    try {
      const response = await fetch('http://localhost:3000/v1/api/users');
      const data = await response.json();
      setJsonData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSelectUser = (e) => {
    const selectedId = e.target.value;
    setSelectedUserId(selectedId);

    const selectedUser = jsonData.find((user) => user._id === selectedId);

    setUpdatedUser(selectedUser || { name: '', age: '', bloodType: '', birthdate: '', countryOfBirth: '' });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      if (
        updatedUser.name === '' &&
        updatedUser.age === '' &&
        updatedUser.bloodType === '' &&
        updatedUser.birthdate === '' &&
        updatedUser.countryOfBirth === ''
      ) {
        // If all fields are empty, delete the user
        await fetch(`http://localhost:3000/v1/deleteUser/${selectedUserId}`, {
          method: 'POST',
        });
      } else {
        // If fields are not empty, update the user
        await fetch('http://localhost:3000/v1/updateUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: selectedUserId,
            name: updatedUser.name,
            age: updatedUser.age,
            bloodType: updatedUser.bloodType,
            birthdate: updatedUser.birthdate,
            countryOfBirth: updatedUser.countryOfBirth,
          }),
        });
      }

      window.location.reload();
      fetchJsonData();

      setSelectedUserId('');
      setUpdatedUser({
        name: '',
        age: '',
        bloodType: '',
        birthdate: '',
        countryOfBirth: '',
      });
    } catch (error) {
      console.error('Error updating/deleting user:', error);
    }
  };

  return (
    <div className="app-section">
      <h2>Update User</h2>
      <form onSubmit={handleUpdateUser}>
        <label htmlFor="userId">Select User:</label>
        <select id="userId" value={selectedUserId} onChange={handleSelectUser} required>
          <option value="" disabled>Select user</option>
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
