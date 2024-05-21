import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
 
const url = 'https://digitaldev.io.vn/todos';
const data = {
    name: 'LAMPE4567',
    mac: '22228',
    status: false
};
const content_type = 'application/json';

const HomePage = ({navigation}: any) => {

  const [fetchedData, setFetchedData] = useState<any[]>([]);

  const handleGetRequest = () => {
    fetch(url, {
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
    .then(data_get => {
      setFetchedData(data_get);
    })
    .catch(error => {
      console.error('Il y a eu un problème avec l\'opération fetch :', error);
    });
  }


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.orangeText}>
          RangdongIoT
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('editPage')  }
        >
          <Text style={styles.buttonText}>Go to Edit Page</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGetRequest}>
          <Text style={styles.buttonText}>FETCH GET</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePutRequest}>
          <Text style={styles.buttonText}>FETCH PUT (EDIT)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDeleteRequest}>
          <Text style={styles.buttonText}>FETCH DELETE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePostRequest}>
          <Text style={styles.buttonText}>FETCH POST (CREATE)</Text>
        </TouchableOpacity>
        {fetchedData.map((item, index) => (
            <ThemedText key={index} type="subtitle" style={styles.orangeText} >
              name : {item.name}
              mac : {item.mac}
              status : {item.status.toString()}
              id : {item.id}
            </ThemedText>
        ))}
      </View>
    </View>
  );
}

const todoId = '3'; 
const apiUrl = 'http://digitaldev.io.vn/todos/' + todoId;

function handleDeleteRequest() {
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

async function handlePutRequest() {
  const data = {
      name: "marion",
      mac: "121121",
      status: true
  };

  try {
      const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error('HTTP error! status: ${response.status}');
      }

      const responseData = await response.json();
      console.log('Response:', responseData);
  } catch (error) {
      console.error('Error:',error);
  }
}

  function handlePostRequest(){
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

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 20,
  },
  orangeText: {
    color: '#C15F05',
    fontSize: 24,
    fontWeight: 'bold',
  },  
  textSimple: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 6,
    backgroundColor: '#EADFC4'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 10,
    backgroundColor: '#AB2626',
  },
  buttonText: {
    color: 'black', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});
