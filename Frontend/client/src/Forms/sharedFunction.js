import { useEffect } from 'react';

export const useFetchData = (url, setData) => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error(`Error fetching data from ${url}:`, error);
        }
      };
  
      fetchData();
    }, [url, setData]);
  };
  