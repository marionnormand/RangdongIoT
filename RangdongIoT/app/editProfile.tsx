import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const EditProfile = ({ navigation }: any) => {
    const defaultImage = require('@/assets/images/react-logo.png');
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

    const saveImage = async (imageUri: string) => {
        try {
            await AsyncStorage.setItem('profileImage', imageUri);
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement de l\'image :', error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
          const { uri } = result.assets[0];
          setImage({ uri });
          saveImage(uri);
          console.log('New image selected:', uri);
      }
    };

 //           
    return (
        <View style={styles.container}>
            <View style={styles.editProfileContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={image} style={styles.image} />
                    <Text style={styles.textProfile}>Edit image</Text>
                </TouchableOpacity>
            </View>
            <View style= {{marginTop: 50}}>
              <View style={styles.row}>
                  <ThemedText type="subtitle" style={styles.text}>Username</ThemedText>
                  <View style={styles.textContainer}>
                      <ThemedText style={styles.text}>Database</ThemedText>
                  </View>
                  <TouchableOpacity >
                      <Image
                          source={require('@/assets/images/chevron_right.png')}
                          style={styles.chevron}
                      />
                  </TouchableOpacity>
              </View>
              <View style={styles.row}>
                  <ThemedText type="subtitle" style={styles.text}>Email</ThemedText>
                  <View style={styles.textContainer}>
                      <ThemedText style={styles.text}>Email</ThemedText>
                  </View>
              </View>
              <View style={styles.row}>
                  <ThemedText type="subtitle" style={styles.text}>Password</ThemedText>
                  <View style={styles.textContainer}>
                      <ThemedText style={styles.text}>Password</ThemedText>
                  </View>
              </View>
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
        paddingTop: 20,
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'white',
        //justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        width: '100%',
        paddingTop: 30,
    },
    buttonContainer: {
      flexDirection: 'row',
      paddingTop: 50,
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: '#AAB565',
      width: 85,
      height: 63,
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
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    textProfile: {
        marginTop: 10, /* Espace au-dessus du texte */
        color: '#933434',
        textAlign: 'center',
    },
    image: {
        width: 100, /* Largeur de l'image */
        height: 100, /* Hauteur de l'image */
        borderRadius: 50, /* Pour rendre l'image ronde */
    },
    chevron: {
        width: 20,
        height: 20,
        left: 30,
    },
    textContainer: {
      flex: 1,
      //alignItems: 'center',
      left: -20,
  },
  
});