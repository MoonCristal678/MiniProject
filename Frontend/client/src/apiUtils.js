// apiUtils.js

export const fetchData = async (url, method, body, successCallback, errorCallback) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      successCallback(data);
    } catch (error) {
      console.error(error);
      errorCallback(error);
    }
  };
  