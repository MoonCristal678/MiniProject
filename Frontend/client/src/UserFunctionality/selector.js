export const handleSelectUser = (e, jsonData, setSelectedUserId, setUpdatedUser) => {
    const selectedId = e.target.value;
    setSelectedUserId(selectedId);
  
    const selectedUser = jsonData.find((user) => user._id === selectedId);
  
    setUpdatedUser(selectedUser || { name: '', age: '', bloodType: '', birthdate: '', countryOfBirth: '' });
  };
  