import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from './authent/AuthContext';  
import { Dropdown } from 'react-native-element-dropdown';
import CustomFormatDate from '@/components/CustomFormatDate'
import { handleGetRequest } from './network/get';
import { handlePutRequest } from './network/put';
import { DataProfile } from './network/DataToSend'
import { useError } from './error/errorContext';
import Toast from 'react-native-root-toast'; 

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const parseDate = (dateString:string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};
   


const EditProfile = ({ navigation }: any) => {
    const defaultImage = require('@/assets/images/react-logo.png');
    const [image, setImage] = useState(defaultImage);
    const { username } = useContext(AuthContext);
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(['DD', 'MM', 'YYYY']);
    const formattedDate = date.filter(char => char !== '/' && char !== ',').join('');
    const [fetchedData, setFetchedData] = useState<any>({});
    const nonFormattedDate = fetchedData.birthdate ? parseDate(fetchedData.birthdate) : 'DD/MM/YYYY';
    const { error, setError } = useError(); 
    const [save, setSave] = useState(false);

    const newData: DataProfile = {
        gender: gender,
        birthdate: formattedDate,
    };

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission required', 'Please allow access to the gallery.');
            }
        })();

        loadImage();
        handleGetRequest(setFetchedData, 'https://digitaldev.io.vn/auth/get_user/' + username);
    }, []);

    useEffect(() => {
        if (fetchedData) {
            setEmail(fetchedData.email);
            setGender(fetchedData.gender);
            setDate(fetchedData.birthday ? fetchedData.birthday.split('/') : ['DD', 'MM', 'YYYY']);
        }
    }, [fetchedData]);

    useEffect(() => {
        console.log('useEffect triggered with error:', error);
        if (error || save) {
            let message = '';
            if (error === 200 && save) {
                message = 'Profile updated successfully';
                setSave(false); 
                navigation.navigate('homePage');
            } else if (error === 404) {
                message = 'Username unknown'; 
            } else {
                message = 'Error: ' + error;
            }
            Toast.show(message, { duration: Toast.durations.LONG });
        }
    }, [error, save]);

    const BackHome = () => {
        navigation.navigate('homePage');
    };

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

    const handleGenderChange = (item: any) => {
        console.log(item.label)
        setGender(item.label); // Mettre à jour l'état du genre avec l'option sélectionnée
    };

    const buttonSave = () => {
        console.log('gender : ' + gender);
        console.log('birthdate : ' + formattedDate);
        setSave(true);
        handlePutRequest(newData, 'https://digitaldev.io.vn/auth/update_user/' + username, setError);
    }

    return (
        <View style={styles.container}>
            <View style={styles.editProfileContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={image} style={styles.image} />
                    <Text style={styles.textProfile}>Edit image</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 50 }}>
                <View style={styles.row}>
                    <ThemedText type="subtitle" style={styles.text}>Username</ThemedText>
                    <View style={styles.textContainer}>
                        <ThemedText style={styles.text}>{username}</ThemedText>
                    </View>
                </View>
                <View style={styles.row}>
                    <ThemedText type="subtitle" style={styles.text}>Email</ThemedText>
                    <View style={styles.textContainerMail}>
                        <Text>{email}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <ThemedText type="subtitle" style={styles.text}>Birthday</ThemedText>
                    <View style={styles.date}>
                        <CustomFormatDate
                            value={nonFormattedDate}
                            onChangeText={(text: string) => setDate(text.split(''))}
                        /> 
                    </View>
                </View>
                <View style={styles.row}>
                    <ThemedText type="subtitle" style={styles.text}>Gender</ThemedText>
                    <View style={styles.textContainer}>
                        <Dropdown
                            style={styles.dropdown}
                            data={[
                                { label: 'Female', value: 'female' },
                                { label: 'Male', value: 'male' }
                            ]}
                            labelField="label"
                            valueField="value"
                            placeholder="Select gender"
                            value={gender} // Utiliser l'état pour afficher la sélection
                            onChange={handleGenderChange} // Mettre à jour l'état lors de la sélection
                        />
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={BackHome}>
                    <ThemedText style={styles.buttonText}>Cancel</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={buttonSave}>
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
    },
    text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
    },
    date: {
        left: 40,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        width: '100%',
        paddingTop: 20,
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
        marginTop: 10,
        color: '#933434',
        textAlign: 'center',
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 50,
    },
    textContainerMail: {
        left: 80,
    },
    textContainer: {
        flex: 1,
        left: -20,
        alignItems: 'center'
    },
    input: {
        width: 160,
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 10,
        marginLeft: 75,
        color: 'black',
    },
    dropdown: {
        width: 160, // Largeur du menu déroulant
        borderWidth: 1, // Épaisseur de la bordure
        borderColor: 'gray', // Couleur de la bordure
        borderRadius: 8, // Rayon de la bordure
        paddingHorizontal: 10, // Espacement horizontal à l'intérieur du menu déroulant
        paddingVertical: 8, // Espacement vertical à l'intérieur du menu déroulant
        backgroundColor: '#FFFFFF',
        marginLeft: 100,
    },
});
