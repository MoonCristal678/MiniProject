// Place your fetchUserData and updateUser functions here
export const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/v1/api/users');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching user data:', error);
    }
  };
  
  export const updateUser = async (userId, userData) => {
    const endpoint = userData.delete ? `deleteUser/${userId}` : 'updateUser';
  
    try {
      await fetch(`http://localhost:3000/v1/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...userData,
        }),
      });
    } catch (error) {
      throw new Error('Error updating/deleting user:', error);
    }
  };
  