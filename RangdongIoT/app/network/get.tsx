import Toast from 'react-native-root-toast';

//const url = 'https://digitaldev.io.vn/todos';
const content_type = 'application/json';



const url2 = 'https://digitaldev.io.vn/todos'; 



export const handleGetRequest = async (setFetchedData: React.Dispatch<React.SetStateAction<any[]>>, url:string) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': content_type,
      },
    });
    Toast.show('error : ' + response.status, {duration: Toast.durations.LONG,}) 

    if (!response.ok) {
      throw new Error('La réponse du réseau n\'est pas valide ' + response.statusText);
    }

    const data_get = await response.json();
    setFetchedData(data_get);
  } catch (error) {
    //console.error('Error with fetch :', error );
    //Toast.show('Problem with fetch' + error, {duration: Toast.durations.LONG,}) 
  }
};
