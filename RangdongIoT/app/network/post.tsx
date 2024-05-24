import { DataToSend } from './DataToSend'

const url = 'https://digitaldev.io.vn/todos/Testdb_Todo/dbmarion';
const content_type = 'application/json';

export const handlePostRequest = (data:DataToSend) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': content_type
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
  }
  