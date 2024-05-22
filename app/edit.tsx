import { StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { View, Text} from 'react-native';
import React, { useState } from 'react';
import Toggle from "react-native-toggle-element";


import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomAlertBox from "@/components/CustomAlertBox";
import { LogBox } from 'react-native';
import { handlePostRequest, DataToSend } from './http_handlers'; 


// Ignore les avertissements spécifiques ===> gerer ca
LogBox.ignoreLogs([
  'Support for defaultProps will be removed from function components',
]);


const EditScreen = ({navigation} : any) => {

  const [name, setName] = useState('');
  const [mac, setMac] = useState('');
  const [isSend, setIsSend] = useState(false);
  
  const newData: DataToSend = {
    name: name,
    mac: mac,
    status: false,
    id : 11
  };

  const [toggleValue, setToggleValue] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleCancel = () => {
    console.log(`Cancel pressed`);
    setShowAlert(false);
  };

  const handleSave = async () => {
    console.log(`Save pressed`);
    try {
      await handlePostRequest(newData);
      setIsSend(true);
      setShowAlert(true); // Afficher l'alerte
    } catch (error) {
      console.error('Error while saving:', error);
      setIsSend(false);
      setShowAlert(true);
    }
  };

  const BackHome = () => {
    setShowAlert(false);
    navigation.navigate('index');
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
        <ThemedText type="subtitle" style={styles.centeredTextSub}>Edit database</ThemedText>
      </ThemedView>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Name :</Text>
          <TextInput
            style={styles.input}
            placeholder="New name..."
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>MAC :</Text>
          <TextInput
            style={styles.input}
            placeholder="New MAC..."
            value={mac}
            onChangeText={text => setMac(text)}
          />
        </View>
      </View>
      <View style={styles.toggle}>
        <Text style={styles.label}>Status :    </Text>
        <Toggle
          value={toggleValue}
          onPress={(newState) => setToggleValue(toggleValue)}
          leftTitle="ON"
          rightTitle="OFF"
          trackBar={{
            width: 140,
            height: 40,
            radius: 25,
            activeBackgroundColor: "#D9D9D9",
            inActiveBackgroundColor: "#D9D9D9",
            borderActiveColor: "#D9D9D9",
            borderInActiveColor: "#D9D9D9",
            borderWidth: 2,
          }}
          thumbButton={{
            width: 60,
            height: 40,
            radius: 30,
            activeBackgroundColor: "#943832",
            inActiveBackgroundColor: "#5D9432",
          }} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={BackHome}>
          <ThemedText style={styles.buttonText}>Cancel</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleSave}>
          <ThemedText style={styles.buttonText}>Save</ThemedText>
        </TouchableOpacity>
      </View>
      <CustomAlertBox
        visible={showAlert}
        message={
          <Text>
            {isSend === true ? "Changes applied successfully." : "Unable to apply changes."}
          </Text>
        }
        onCancel={handleCancel}
        onConfirm={BackHome}
        confirmButtonText='OK'
      />
    </View>
  );
}

export default EditScreen;

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
    backgroundColor: '#FFFFFF', // Define your desired background color
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
    position: 'absolute', // Position the image absolutely
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
    width: 85,
    height: 63,
    left: 140,
    borderRadius: 10, // Arrondi des coins du bouton
  },
  buttonText: {
    color: '#FFFFFF', // Couleur du texte du bouton
    fontSize: 15, // Taille de police du texte du bouton
    marginTop: 20,
    fontWeight: 'bold', // Gras du texte du bouton
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#C94A4A', // Couleur de fond pour le bouton Cancel
  },
  confirmButton: {
    backgroundColor: '#5DA2A6', 
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 120,
  },
  label: {
    right: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  input: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: 160,
    marginLeft: 10, // Marge à gauche de l'input
  },
  toggle: {
    alignItems: 'center',
    flexDirection: 'row',
    left: 75,
  },
  buttonContainer: {
    flexDirection: 'row',
    right: 110,
    paddingTop: 50,
    justifyContent: 'space-between',
    marginRight: 70,
  },
});