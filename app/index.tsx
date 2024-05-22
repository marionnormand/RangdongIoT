import { Image, Text, StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomAlertBox from "@/components/CustomAlertBox";
import { handleGetRequest , handleDeleteRequest} from './http_handlers'; 
import { useFocusEffect } from '@react-navigation/native';


const HomeScreen = ({ navigation }: any) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [selectedRectangle, setSelectedRectangle] = useState<number | null>(null);

  const [fetchedData, setFetchedData] = useState<any[]>([
    { name: 'CB Do am dat', mac: 'f5412a29-c6d2-4fb7-88d8-546df86d33a2', id : 0 },
    { name: 'Bauchy', mac: 'f5412a29-c6d2-4fb7-88d8-546df86d33a3', id : 1 },
    //simul
  ]);

  const GoEdit = () => {
    navigation.navigate('edit');
    setShowAlert(false);
  };
  
  const unShowBox = async () => {
    if (selectedRectangle !== null && selectedRectangle >= 0 && selectedRectangle < fetchedData.length) {
      console.log(`Delete pressed`);
      const rectangleToDelete = fetchedData[selectedRectangle].id;
      //const { name, mac } = rectangleToDelete;
      try {
        await handleDeleteRequest(rectangleToDelete);
        setShowAlert(false); // Masquer l'alerte après la suppression
        //console.log(`Element ${name} (${mac}) deleted`);
        getUpdate();
        console.log(`MAJ des données`);
      } catch (error) {
        console.error('Error while deleting:', error);
        // Gérer l'erreur ici
        //console.log(`Unable to delete element ${name} (${mac})`);
      }
    } else {
      console.log(`Delete annulé`);
      setShowAlert(false);
    }
  };

  const handleOptionsPress = (rectangleId: number) => {
    // Afficher une alerte avec les options "Edit" et "Delete"
    console.log(`Rectangle pressed`);
    setSelectedRectangle(rectangleId);
    setShowAlert(true);
  };

  const handleNewPress = () => {
    console.log(`New pressed`);
    setSelectedRectangle(null);
    // Afficher une alerte avec les options "New" et "Cancel"
    setShowAlert(true);
  };

  const getUpdate = async () => {
    try {
      const data = await handleGetRequest();
      setFetchedData(data);
    } catch (error) {
      // Gérez les erreurs ici
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUpdate();
      console.log(`MAJ des données`);
    }, [])
  );


  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.centeredText}>RangdongIoT</ThemedText>
      </ThemedView>
      <Image
        source={require('@/assets/images/flag_vietnam.png')}
        style={styles.flag_viet}
      />
      <Image
        source={require('@/assets/images/rang-dong-icon.png')}
        style={styles.rang}
      />
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.centeredTextSub}>Database</ThemedText>
      </ThemedView>
      <ThemedView style={styles.scrollContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNewPress}>
          <ThemedText style={styles.buttonText}>New</ThemedText>
        </TouchableOpacity>
        <ScrollView>
          {fetchedData.map((item,index) => (
            <TouchableOpacity
              key={item.name}
              style={styles.rectangle}
              onPress={() => handleOptionsPress(index)}>
              <View style={{ alignItems: 'flex-start', right: 30 }}>
                <ThemedText style={styles.rectangleText}>
                  <ThemedText style={styles.rectangleTextBold}>name : </ThemedText>
                  {item.name}
                </ThemedText>
                <ThemedText style={styles.rectangleText}>
                  <ThemedText style={styles.rectangleTextBold}>mac : </ThemedText>
                  {item.mac}
                </ThemedText>
              </View>

              <View style={styles.optionsContainer}>
                <TouchableOpacity onPress={() => handleOptionsPress(index)}>
                  <View style={styles.optionDot} />
                  <View style={styles.optionDot} />
                  <View style={styles.optionDot} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      {showAlert && (
        <CustomAlertBox
          visible={showAlert}
          message={
            <Text>
              Do you want to have new data ?
            </Text>
          }
          onCancel={unShowBox}
          onConfirm={GoEdit}
          confirmButtonText={selectedRectangle !== null ? 'Edit' : 'New'}
          cancelButtonText={selectedRectangle !== null ? 'Delete' : 'Cancel'}
          showCancelButton={true}
        />)}

    </View>

  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Aligne le texte
    gap: 8,
    backgroundColor: '#FFF',
  },
  stepContainer: {
    gap: 10,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center', // Aligne le texte
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20, // Adjust as needed
    paddingTop: 150, // c est l endroit auquel ca commence
  },
  flag_viet: {
    width: 76, // Width of the image
    height: 65, // Height of the image
    position: 'absolute', // Position the image absolutely
    top: 143, // Adjust position from the top
    left: 45, // Adjust position from the left
    zIndex: 1, 
  },
  rang: {
    width: 58, // Width of the image
    height: 55, // Height of the image
    position: 'absolute', // Position the image absolutely, n'affecte pas les autres elements
    top: 143, // Adjust position from the top
    right: 45, // Adjust position from the left
    resizeMode: 'contain',
    zIndex: 1, // image au dessus des autres elements
  },
  centeredText: {
    textAlign: 'center',
    color: '#C15F05',
    fontSize: 20,
  },
  centeredTextSub: {
    textAlign: 'center',
    color: '#933434',
    fontSize: 15,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#AAB565', // Couleur de fond du bouton
    width: 80,
    height: 23,
    left: 140,
    borderRadius: 10, // Arrondi des coins du bouton
  },
  buttonText: {
    color: '#FFFFFF', // Couleur du texte du bouton
    fontSize: 12, // Taille de police du texte du bouton
    fontWeight: 'bold', // Gras du texte du bouton
    textAlign: 'center',
  },
  rectangle: {
    width: 374, // Largeur du rectangle
    height: 53, // Hauteur du rectangle
    backgroundColor: '#BE9F9F70', // Couleur de fond du rectangle
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    marginVertical: 5, // Marge horizontale entre les rectangles
    borderRadius: 10, // Arrondi des coins du rectangle
  },
  rectangleText: {
    color: '#000000', // Couleur du texte du rectangle
    fontSize: 12, // Taille de police du texte du rectangle
    textAlign: 'left',
    right: 100,
    alignItems: 'flex-start'
  },
  rectangleTextBold: {
    color: '#000000', // Couleur du texte du rectangle
    fontSize: 12, // Taille de police du texte du rectangle
    fontWeight: 'bold',
  },
  scrollContainer: {
    gap: 10,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center', // Aligne le texte
    paddingTop: 60,
    backgroundColor: '#FFF',
  },
  optionsContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 30,
  },
  optionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginVertical: 3,
    left : 17,
    top : 3, 
    backgroundColor: '#FFF',
  },
});
