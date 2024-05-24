const url = 'https://digitaldev.io.vn/todos/Testdb_Todo/dbmarion';
const data = {
    name: 'LAMPE4567',
    mac: '22228',
    status: false
};
const content_type = 'application/json';


export const handleGetRequest = async (setFetchedData: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': content_type,
        },
      });
  
      if (!response.ok) {
        throw new Error('La réponse du réseau n\'est pas valide ' + response.statusText);
      }
  
      const data_get = await response.json();
      setFetchedData(data_get);
    } catch (error) {
      console.error('Il y a eu un problème avec l\'opération fetch :', error);
    }
  };