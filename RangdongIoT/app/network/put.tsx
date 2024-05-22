const todoId = '11'; 
const apiUrl = 'https://digitaldev.io.vn/todos/' + todoId;
const content_type = 'application/json';

export const handlePutRequest = async () => {
  const data_put = {
      name: 'marion',
      mac: '121212',
      status: true 
  };

  try {
      const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
              'Accept': content_type,
              'Content-Type': content_type
          },
          body: JSON.stringify(data_put)
      });

      if (!response.ok) {
          throw new Error('HTTP error! status: ${response.status}');
      }

      const responseData = await response.json();
      console.log('Response:', responseData);
  } catch (error) {
      console.error('Error:', error);
  }
}