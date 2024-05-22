const url = 'https://digitaldev.io.vn/todos';
const data = {
    name: 'LAMPE4567',
    mac: '22228',
    status: false
};
const content_type = 'application/json';


export const handlePostRequest = () => {
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
  