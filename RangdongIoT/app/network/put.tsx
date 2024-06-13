
const content_type = 'application/json';

export const handlePutRequest = async (data:any, url:string, setError: (status: number) => void) => {
  try {
      const response = await fetch(url, {
          method: 'PUT',
          headers: {
              'Accept': content_type,
              'Content-Type': content_type
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      else console.log('OK')
      setError(response.status);  

      const responseData = await response.json();
      console.log('Response:', responseData);
  } catch (error) {
      console.error('Error:', error);
  }
}