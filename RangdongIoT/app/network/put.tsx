
const content_type = 'application/json';

export const handlePutRequest = async (name: string, mac: string, status: boolean, id:number) => {
  const data_put = {
      name: name,
      mac: mac,
      status: status 
  };

  const apiUrl = 'https://digitaldev.io.vn/todos/' + id; 


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
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Response:', responseData);
  } catch (error) {
      console.error('Error:', error);
  }
}