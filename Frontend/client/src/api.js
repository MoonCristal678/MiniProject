// api.js
const apiUrl = 'http://localhost:3000/v1/';

const handleApiRequest = async (endpoint, method, data = {}) => {
  const url = `${apiUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method !== 'GET' ? JSON.stringify(data) : undefined,
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error(`Error ${method} data at ${url}:`, response.statusText);
      throw new Error(`Error ${method} data at ${url}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error ${method} data at ${url}:`, error);
    throw error;
  }
};

export const fetchUserData = async () => handleApiRequest('/api/users', 'GET');

export const updateUser = async (userId, userData) =>
  handleApiRequest('/updateUser', 'POST', { userId, ...userData });

export const fetchFileData = async () => handleApiRequest('/files', 'GET');

export const updateFile = async (fileId, fileData) =>
  handleApiRequest('/updateFile', 'POST', { fileId, ...fileData });

const addUser = async (newUser) => handleApiRequest('/api/users', 'POST', newUser);

export { addUser };
