
const content_type = 'application/json';

export const handleDeleteRequest = (id:number) => {
    const apiUrl = 'https://digitaldev.io.vn/todos' + id; 
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
    });
}