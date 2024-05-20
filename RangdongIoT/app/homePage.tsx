import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';


const HomePage = ({navigation}: any) => {

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
  buttonText: {
    color: 'white', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});
