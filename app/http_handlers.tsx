
const url = 'https://digitaldev.io.vn/todos';
const url_ns = 'https://digitaldev.io.vn/todos';
const content_type = 'application/json';

export interface DataToSend {
  name: string;
  mac: string;
  id : number
  status: boolean;
}

const handleGetRequest = () => {

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': content_type
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('La réponse du réseau n\'est pas valide ' + response.statusText);
    }
    return response.json();
  })
  .catch(error => {
    console.error('Il y a eu un problème avec l\'opération fetch :', error);
    throw error;
  });
};

const handlePostRequest = async (data: DataToSend) => {
  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': content_type
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      return responseData; // retour des donnees si necessaire
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Lancer à nouveau l'erreur pour la gérer dans la fonction appelante
  }
}

const handleDeleteRequest = (id: number) => {
  const apiUrl = url_ns + '/' + id;
  console.log(apiUrl);
  fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': content_type
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Todo deleted successfully');
    })
    .catch(error => {
      console.error('There was a problem deleting the todo:', error);
      console.error('Error code:', error.code);
    });
}
  
export { handleGetRequest, handlePostRequest, handleDeleteRequest };