import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, TextInput, Text, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomAlertBoxPassword from "@/components/CustomAlertBoxPassword";
import { useError } from './error/errorContext';

import { TemplateRangdong } from './templates/templateRangdong'
import { DataAuthen } from './network/DataToSend';
import { handlePost } from './network/post'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const LoginPage = ({ navigation }: any) => {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [showAlert, setShowAlert] = useState(false);
    const { error, setError } = useError(); 

    const newData: DataAuthen = {
        username: username,
        password: password,
    };
    
    const closeAlert = () => {
        setShowAlert(false);
    };

    const openAlert = () => {
        setShowAlert(true);
    };

    const buttonLogin = () => {
        handlePost(newData, 2, setError);
        navigation.navigate('homePage');
        if ( error == 200 ) {
            console.log('login win')
            navigation.navigate('homePage');
        }
        else if ( error == 400 ) {
            console.log('ERROR : Missing arguments')
        }
        else if ( error == 401 ) {
            console.log('ERROR : Error in password or username')
        }
        
    }


    return (
        <View style={styles.container}>
            {TemplateRangdong('Log in')}
            <View style={styles.inputContainer}> 
                <ThemedView style={styles.containerTextinput}>
                    <ThemedView style={styles.stepContainer}>
                        <ThemedText type="subtitle" style={styles.centeredTextSub}>Enter your email and your password to log in</ThemedText>
                    </ThemedView>
                    <TextInput
                        style={styles.input}
                        placeholder="username"
                        placeholderTextColor="#828282"
                        value={username}
                        onChangeText={newText => setUsername(newText)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="password"
                        placeholderTextColor="#828282"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry 
                    />
                    <TouchableOpacity onPress={openAlert}>
                        <ThemedText style={styles.textPassword}> Forgotten password </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonLogin]} onPress={() => buttonLogin()}>
                        <ThemedText style={styles.buttonText}>Log in</ThemedText>
                    </TouchableOpacity>
                    <ThemedText type="subtitle" style={styles.text}>New user ? Sign up !</ThemedText>
                    <TouchableOpacity style={[styles.button, styles.buttonSignup]} onPress={() => navigation.navigate('signupPage')}>
                        <ThemedText style={styles.buttonText}>Sign up</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </View> 
            <CustomAlertBoxPassword
                visible={showAlert}
                message="Enter your email to send a new password"
                onConfirm={closeAlert}
                confirmButtonText='Send email'
                textInput='email@domain.com'
            />

        </View>
    );
}

export default LoginPage;

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#FFF',
    },
    stepContainer: {
        gap: 10,
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingBottom: 40,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 120,
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
    flag_viet: {
        width: 58,
        height: 65,
        position: 'absolute',
        left: 25,
        top: 0,
        resizeMode: 'contain',
        zIndex: 1,
    },
    rang: {
        width: 58,
        height: 55,
        position: 'absolute',
        right: 25,
        top: 0,
        resizeMode: 'contain',
        zIndex: 1,
    },
    button: {
        width: 85,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLogin: {
        backgroundColor: '#AAB565',
    },
    buttonSignup: {
        backgroundColor: '#5DA2A6',
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
    }, 
    containerTextinput: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    input: {
        width: windowWidth - 50,
        height: 50,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10, 
        marginLeft: 10,
        //marginBottom: 30,
        marginTop: 30,
        color: 'black', 
    },
    inputContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 50,
    },
    textPassword: {
        color: '#933434',
        marginLeft: 170,
        marginBottom: 30,
    },
    text: {
        color: '#933434',
        marginTop: 30,
        marginBottom: 10,
        fontSize: 15,
    },
});


/*<ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={styles.centeredText}>RangdongIoT</ThemedText>
                <Image
                    source={require('@/assets/images/logo_vietnam.png')}
                    style={styles.flag_viet}
                />
                <Image
                    source={require('@/assets/images/rang-dong-icon.png')}
                    style={styles.rang}
                />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle" style={styles.centeredTextSub}>Log in</ThemedText>
            </ThemedView>
            */