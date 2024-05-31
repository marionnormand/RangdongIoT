import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Image, TextInput, LogBox } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomAlertBoxNew from "@/components/CustomAlertBoxNew";
import { Switch } from 'react-native-switch';

import { handlePost } from './network/post'
import { DataToSend } from './network/DataToSend'
import { TemplateRangdong } from './templates/templateRangdong'


const NewPage = ({navigation}: any) => {

  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [mac, setMac] = useState('');
  const [isSend, setIsSend] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const newData: DataToSend = {
    name: name,
    mac: mac,
    status: toggleValue,
  };

  const handleCancel = () => {
    console.log(`Cancel pressed`);
    setShowAlert(false);
  };

  const handleSave = async () => {
    console.log(`Save pressed`);
    try {
      await handlePost(newData, 1);
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
    navigation.navigate('homePage');
  };

  return (
    <View style={styles.container}>
      {TemplateRangdong('New database')}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Name :</Text>
          <TextInput
            style={styles.input}
            placeholder="New name..."
            placeholderTextColor="#828282"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>MAC :</Text>
          <TextInput
            style={styles.input}
            placeholder="New mac..."
            placeholderTextColor="#828282"
            value={mac}
            onChangeText={text => setMac(text)}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Status :</Text>
          <View style={styles.toggleContainer}>
          <Switch
            value={toggleValue}
            onValueChange={val => setToggleValue(val)}
            disabled={false}
            activeText={'ON'}
            inActiveText={'OFF'}
            circleSize={50}
            barHeight={50} // Hauteur de la barre (ovale horizontal)
            circleBorderWidth={0}
            backgroundActive={'#D9D9D9'}
            backgroundInactive={'#D9D9D9'}
            circleActiveColor={'#5D9432'}
            circleInActiveColor={'#943832'}
            renderInsideCircle={() => <Text style={styles.activeText}>{toggleValue ? 'ON' : 'OFF'}</Text>}
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={1.6} // Déplace le cercle de moitié de sa taille vers la gauche
            switchRightPx={1.6} // Déplace le cercle de moitié de sa taille vers la droite
            switchWidthMultiplier={2} // Double la largeur de la barre
            switchBorderRadius={25} // Rayon de l'ovale
          />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={BackHome}>
          <ThemedText style={styles.buttonText}>Cancel</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleSave}>
          <ThemedText style={styles.buttonText}>Save</ThemedText>
        </TouchableOpacity>
      </View>
      <CustomAlertBoxNew
        visible={showAlert}
        message={
          <Text>
            {isSend === true ? "New data created successfuly" : "Unable to create new data"}
          </Text>
        }
        onCancel={handleCancel}
        onConfirm={BackHome}
        confirmButtonText='OK'
      />
    </View>
  );
}


export default NewPage;

const styles = StyleSheet.create({
  activeText: {
    color: '#FFFFFF',
    fontSize: 16,
    position: 'absolute', // Pour positionner le texte 'ON'
  },
  inactiveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10, // Marge pour le texte 'OFF'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFF',
  },
  stepContainer: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 120,
  },
  flag_viet: {
    width: 76,
    height: 65,
    position: 'absolute',
    marginLeft: 20,
    marginTop: 120,
    zIndex: 1, 
  },
  rang: {
    width: 58,
    height: 55,
    position: 'absolute',
    marginHorizontal: 280,
    marginTop: 120,
    resizeMode: 'contain',
    zIndex: 1, 
  },
  centeredText: {
    textAlign: 'center',
    color: '#C15F05',
    fontSize: 25,
  },
  centeredTextSub: {
    textAlign: 'center',
    color: '#933434',
    fontSize: 15,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#AAB565',
    width: 85,
    height: 63,
    left: 140,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#C94A4A',
  },
  confirmButton: {
    backgroundColor: '#5DA2A6', 
  },
  inputContainer: {
    flexDirection: 'column',
    paddingTop: 120,
  },
  label: {
    flex: 1,
    textAlign: 'right',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    width: '90%',
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  toggleContainer: {
    flex: 2,
    marginLeft: 0,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    right: 110,
    paddingTop: 50,
    justifyContent: 'space-between',
    marginRight: 70,
  },
});
