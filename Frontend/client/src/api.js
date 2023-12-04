const apiUrl = 'http://localhost:3000';

const handleApiRequest = async (endpoint, method, data = {}) => {
  const url = `${apiUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      method,
      credentials: 'include',  // Include credentials (session cookie)
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


export const loginUser = async (loginData) => {
  const url = `${apiUrl}/auth/login`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include', // Include credentials (session cookie)
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
   
    });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const registerUser = async (registrationData) => {
  const url = `${apiUrl}/auth/register`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
      credentials: 'include', // Include credentials (cookies)
    });

    return response;
  } catch (error) {
    console.error('Error during user registration:', error);
    throw error;
  }
};
export const fetchUserData = async () => handleApiRequest('/v1/api/users', 'GET');

export const updateUser = async (userId, userData) =>
  handleApiRequest('/v1/updateUser', 'POST', { userId, ...userData });

export const fetchFileData = async () => handleApiRequest('/v1/files', 'GET');

export const updateFile = async (fileId, fileData) =>
  handleApiRequest('/v1/updateFile', 'POST', { fileId, ...fileData });

const addUser = async (newUser) => handleApiRequest('/v1/api/users', 'POST', newUser);

export { addUser };
