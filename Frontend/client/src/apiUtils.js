// apiUtils.js

const handleReadFile = async (fileName, setReadContent) => {
    try {
      const response = await fetch(`https://your-api-endpoint/v1/read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setReadContent(data.content.replace(/<\/?[^>]+(>|$)/g, ''));
      } else {
        console.error('Error reading file:', data.message);
        setReadContent('');
      }
    } catch (error) {
      console.error('Error reading file:', error);
      setReadContent('');
    }
  };
  
  export { handleReadFile };
  