import { useError } from '@/app/error/errorContext';
import { DataAuthen, DataToSend, DataSignup } from './DataToSend';

const url1 = 'https://digitaldev.io.vn/todos';
const url2 = 'https://digitaldev.io.vn/auth/signin';
const url3 = 'https://digitaldev.io.vn/auth/signup';
const content_type = 'application/json';

function isDataToSend(data: any): data is DataToSend {
  return (
    typeof data.name === 'string' &&
    typeof data.mac === 'string' &&
    typeof data.status === 'boolean'
  );
}

function isDataAuthen(data: any): data is DataAuthen {
  return (
    typeof data.username === 'string' &&
    typeof data.password === 'string'
  );
}

function isDataSignup(data: any): data is DataSignup {
  return (
    typeof data.email === 'string' &&
    typeof data.username === 'string' &&
    typeof data.password === 'string'
  );
}

export const handlePost = (data: any, which: number, setError:(status:number) => void) => {
  if (which === 1 && isDataToSend(data)) {
    handlePostRequest(data, url1, setError);
  } else if (which === 2 && isDataAuthen(data)) {
    handlePostRequest(data, url2, setError);
  } else if (which === 3 && isDataSignup(data)) {
    handlePostRequest(data, url3, setError);
    console.log('log in passé ');
  } else {
    console.log('ERROR: Invalid data format or request type');
    return;
  }
};

export const handlePostRequest = (data: any, url: string, setError: (status: number) => void) => {

  console.log(data + JSON.stringify(data));
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': content_type
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      setError(response.status);  // Mettez à jour l'état de l'erreur globalement
      if (!response.ok) {
        console.log(response.status);
        throw new Error('Network response was not ok ' + response.statusText);
      }
      if (response.status === 200) {
        console.log('Success !!');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  console.log(JSON.stringify(data));
};
