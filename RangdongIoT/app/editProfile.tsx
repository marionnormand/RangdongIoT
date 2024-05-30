import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const EditProfile = ({ navigation }: any) => {

    const defaultImage = require('@/assets/images/react-logo.png')
    const [image, setImage] = useState(defaultImage);

    const BackHome = () => {
        navigation.navigate('homePage');
    };

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission required', 'Please allow access to the gallery.');
            }
        })();
        const loadImage = async () => {
          try {
            const savedImageUri = await AsyncStorage.getItem('profileImage');
            if (savedImageUri !== null) {
              setImage({ uri: savedImageUri });
            }
          } catch (error) {
            console.error('Erreur lors du chargement de l\'image :', error);
          }
        };
      
        // Chargez l'image lorsque le composant est monté
        loadImage();
    }, []);
      
    
    const loadImage = async () => {
        try {
          const savedImageUri = await AsyncStorage.getItem('profileImage');
          if (savedImageUri !== null) {
            setImage({ uri: savedImageUri });
          }
        } catch (error) {
          console.error('Erreur lors du chargement de l\'image :', error);
        }
      };
    
      const saveImage = async (imageUri:any) => {
        try {
          await AsyncStorage.setItem('profileImage', imageUri);
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement de l\'image :', error);
        }
      };
    
      // ouvre galerie photo et selectionne image 
      const pickImage = async () => {
        let result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        if (!result.canceled && 'uri' in result) {
          setImage({ uri: result.uri });
          saveImage(result.uri);
        }
      };

    return (
        <View style={styles.container}>
            <View style={styles.editProfileContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.containerPicture}>
                <Image source={image} style={styles.image} />
            </TouchableOpacity>
                <Text style={styles.textProfile}>Edit profile </Text>
            </View>
            <View style={styles.row}>
                <ThemedText type="subtitle" style={styles.text}>Username</ThemedText>
                <ThemedText style={styles.text}>Database</ThemedText>
            </View>
            <View style={styles.row}>
                <ThemedText type="subtitle" style={styles.text}>Email</ThemedText>
                <ThemedText style={styles.text}>Email</ThemedText>
            </View>
            <View style={styles.row}>
                <ThemedText type="subtitle" style={styles.text}>Password</ThemedText>
                <ThemedText style={styles.text}>Password</ThemedText>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={BackHome}>
                <ThemedText style={styles.buttonText}>Cancel</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={BackHome}>
                <ThemedText style={styles.buttonText}>Save</ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditProfile; 

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingHorizontal: 50,
        paddingTop: 120,
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'white',
    },
    text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        width: '90%',
    },
    buttonContainer: {
      flexDirection: 'row',
      right: 110,
      paddingTop: 50,
      justifyContent: 'space-between',
      marginRight: 70,
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
    editProfileContainer: {
      marginTop: 20, // Ajustez cette valeur pour positionner correctement le texte
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    textProfile: {
      color: '#933434',
      textAlign: 'center',
      padding: 10,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    containerPicture: {
      width: 100,
      height: 100,
      borderRadius: 50,
      overflow: 'hidden',
    },
});