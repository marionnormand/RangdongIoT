import { Image, Text, StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomAlertBox from "@/components/CustomAlertBox";

const HomeScreen = ({navigation} : any) => {
  const rectangles = Array.from({ length: 20 }, (_, index) => ({ id: index, text: `Rectangle ${index + 1}` }));
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [selectedRectangleId, setSelectedRectangleId] = useState<number | null>(null);

  const GoEdit = () => {
    navigation.navigate('edit');
    setShowAlert(false);
  };

  const unShowBox = () => {
    console.log(`Cancel pressed`); //debug
    setShowAlert(false);
  };

  const handleOptionsPress = (rectangleId: number) => {
    // Afficher une alerte avec les options "Edit" et "Cancel"
    console.log(`Cancel pressed`);
    setSelectedRectangleId(rectangleId);
    setShowAlert(true);
  };

  const handleNewPress = () => {
    console.log(`New pressed`);
    setSelectedRectangleId(null);
    // Afficher une alerte avec les options "New" et "Cancel"
    setShowAlert(true);
  };

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
          {rectangles.map(rectangle => (
            <TouchableOpacity 
              key={rectangle.id} 
              style={styles.rectangle} 
              onPress={() => handleOptionsPress(rectangle.id+1)}>
              <ThemedText style={styles.rectangleText}>{rectangle.text}</ThemedText>
              <View style={styles.optionsContainer}>
                <TouchableOpacity onPress={() => handleOptionsPress(rectangle.id+1)}>
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
        confirmButtonText={selectedRectangleId !== null ? 'Edit' : 'New'}
        cancelButtonText='Cancel'
        showCancelButton= {true}
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
  },
  stepContainer: {
    gap: 10,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center', // Aligne le texte
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
    marginVertical: 5, // Marge horizontale entre les rectangles
    borderRadius: 10, // Arrondi des coins du rectangle
  },
  rectangleText: {
    color: '#000000', // Couleur du texte du rectangle
    fontSize: 16, // Taille de police du texte du rectangle
    fontWeight: 'bold', // Gras du texte du rectangle
  },
  scrollContainer: {
    gap: 10,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center', // Aligne le texte
    paddingTop: 60,
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
