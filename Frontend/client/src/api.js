// api.js
const apiUrl = 'http://localhost:3000/v1/';

export const fetchUserData = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/users`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    await fetch(`${apiUrl}/updateUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, ...userData }),
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const fetchFileData = async () => {
  try {
    const response = await fetch(`${apiUrl}/files`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching file data:', error);
    throw error;
  }
};

export const updateFile = async (fileId, fileData) => {
  try {
    await fetch(`${apiUrl}/updateFile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileId, ...fileData }),
    });
  } catch (error) {
    console.error('Error updating file:', error);
    throw error;
  }
};

const addUser = async (newUser) => {
  try {
    const response = await fetch(`${apiUrl}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      window.location.reload();
      return true; // Indicate success
    } else {
      console.error('Error adding user:', response.statusText);
      return false; // Indicate failure
    }
  } catch (error) {
    console.error('Error adding user:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export { addUser};