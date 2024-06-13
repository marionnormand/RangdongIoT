import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './_layout';
import { TemplateRangdong } from './templates/templateRangdong';
import { Switch } from 'react-native-switch';
import io from 'socket.io-client';
import Toggle from "react-native-toggle-element"

const LEDcontroller = ({ navigation }: any) => {
  // GET ID from Home page
  const route = useRoute<RouteProp<RootStackParamList, 'ledControl'>>();
  const { datatosend } = route.params || {}; // name
  const { datatosend2 } = route.params || {}; // ID
  const { datatosend3 } = route.params || {}; // status

  // DATA STRUCTURE
  const createData = (id: number, status: number) => {
    return {
      message: {
        method: 'control_led',
        params: {
          id: id,
          status: status,
        },
      },
      topic: 'apptogate',
    };
  };

  // SOCKET HANDLER
  useFocusEffect(
    useCallback(() => {
      console.log('Connected on socket screen');
      const socket = io('https://digitaldev.io.vn');

      socket.on('connect', () => {
        console.log('Connected with socket id:', socket.id);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      socket.on('gateresponse', (data) => {
        try {
          console.log(data);
          if (data.params) {
            const { id, status } = data.params;
            console.log('ID:', id);
            console.log('Status:', status);
            if (id == datatosend2) {
              update_Switch(status);
            }
          } else {
            console.log('parameter unavailable', data);
          }
        } catch (error) {
          console.error('Error in parsing JSON:', error);
        }
      });

      return () => {
        socket.off('gateresponse');
        socket.disconnect();
        console.log('Socket disconnected and listeners removed');
      };
    }, [datatosend2])
  );

  // SWITCH HANDLER
  const [toggleValue, setToggleValue] = useState(datatosend3);

  function update_Switch(newState: boolean) {
    setToggleValue(newState);
  }

  const toggleSwitch = (val:boolean) => {
    const status = toggleValue ? 0 : 1;
    const data = createData(datatosend2, status);
    setToggleValue(val)
    console.log(data)
    fetch('https://digitaldev.io.vn/mqtt/publish', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      })
      .then((responseData) => {
        setToggleValue(!toggleValue);
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      {TemplateRangdong('LED Controller')}
      <View style={styles.switchContainer}>
        <View style={styles.textContainer}>
        <Text style={styles.textTitle}> name : </Text>
        <Text>{datatosend}</Text>
        <Text style={styles.textTitle}> ID : </Text>
        <Text>{datatosend2}</Text>
        </View>
        </View>
        <View style={styles.statusSwitch}>
          <Text style={styles.textTitle}>status:</Text>
          <Switch
            value={toggleValue}
            onValueChange={val => toggleSwitch(val)}
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
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: '#FFFFFF',
  },
  switchContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  statusSwitch: {
    alignItems: 'center',
    //paddingTop: 30,
  },
  textContainer: {
    alignItems: 'center',
    marginTop : 30,
    marginBottom: 0,
  },
  switchWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  backButton: {
    width: 85,
    height: 63,
    marginTop: 150,
    backgroundColor: '#C94A4A',
    borderRadius: 10,
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textTitle: {
    fontSize: 15, // Adjust the size as needed
    color: '#933430', // Change the color as needed
    fontWeight: 'bold',
    paddingTop: 30,
  },
  textBox: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  activeText: {
    color: '#FFFFFF',
    fontSize: 16,
    position: 'absolute', // Pour positionner le texte 'ON'
  },
});

export default LEDcontroller;
