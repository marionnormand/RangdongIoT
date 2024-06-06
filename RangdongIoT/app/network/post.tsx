import { useError } from '@/app/error/errorContext';
import { DataAuthen, DataToSend, DataSignup, DataOTP, DataCode } from './DataToSend';
import Toast  from 'react-native-root-toast';

const url1 = 'https://digitaldev.io.vn/todos';
const url2 = 'https://digitaldev.io.vn/auth/signin';
const url3 = 'https://digitaldev.io.vn/auth/signup';
const url4 = 'https://digitaldev.io.vn/auth/otp/generate'; 
const url5 = 'https://digitaldev.io.vn/auth/otp/verify'; 
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

function isDataOTP(data: any) : data is DataOTP {
  return (
    typeof data.email === 'string'
  );
}

function isDataCode(data: any) : data is DataCode {
  return (
    typeof data.code === 'string'
  )
}

export const handlePost = (data: any, which: number, setError:(status:number) => void) => {
  if (which === 1 && isDataToSend(data)) {
    handlePostRequest(data, url1, setError);
  } else if (which === 2 && isDataAuthen(data)) {
    handlePostRequest(data, url2, setError);
    console.log('log in OK');
  } else if (which === 3 && isDataSignup(data)) {
    handlePostRequest(data, url3, setError);
    console.log('sign up OK ');
  } else if (which === 4 && isDataOTP(data)) {
    handlePostRequest(data, url4, setError);
    console.log('mot de passe envoyé par mail ');
  } else if (which === 5 && isDataCode(data)) {
    handlePostRequest(data, url5, setError);
    console.log('Code envoyé ');
  } else {
    console.log(data)
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
      console.log('Response received:', response.status);
      setError(response.status);  
      if (!response.ok) {
        console.log('Response not OK:', response.statusText);
        console.log(response.status);
        throw new Error('Network response was not ok ' + response.statusText);
      }
      if (response.ok) {
        Toast.show('Success', { duration: Toast.durations.LONG });
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      //console.error('There was a problem with the fetch operation:', error);
      //setError(501)
      Toast.show('Problem with fetch operation: ' + error.message, { duration: Toast.durations.LONG });
    });
  console.log(JSON.stringify(data));
};
