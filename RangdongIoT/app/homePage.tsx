import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

import { handleDeleteRequest } from './network/delete'
import { handlePostRequest } from './network/post'
import { handlePutRequest } from './network/put'
import { handleGetRequest } from './network/get'


const HomePage = ({navigation}: any) => {
  const [fetchedData, setFetchedData] = useState<any[]>([]);

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
        <TouchableOpacity style={styles.button} onPress={() => handleGetRequest(setFetchedData)}>
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
        {fetchedData && fetchedData.length > 0 ? (
          fetchedData.map((item, index) => (
            <ThemedText key={index} type="subtitle" style={styles.orangeText}>
              name : {item.name}
              mac : {item.mac}
              status : {item.status.toString()}
              id : {item.id}
            </ThemedText>
          ))
        ) : (
          <Text style={styles.buttonText}>for seeing datas, click on 'FETCH GET'</Text>
        )}
      </View>
    </View>
  );
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
