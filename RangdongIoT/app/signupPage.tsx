import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, TextInput, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useError } from './error/errorContext';
import Toast from 'react-native-root-toast';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AuthContext } from './authent/AuthContext';

import { TemplateRangdong } from './templates/templateRangdong'
import { DataSignup } from './network/DataToSend';
import { handlePost } from './network/post';
import CustomAlertBoxCode from "@/components/CustomAlertBoxCode";
import { DataOTP, DataCode } from './network/DataToSend';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SignupPage = ({ navigation }: any) => {
    const { username, setUsername } = useContext(AuthContext);

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [showPassword, setShowPassword] = useState(false); 
    //const [username, setUsername] = useState(''); 
    const { error, setError } = useError(); 
    const [emailSent, setEmailSent] = useState(false);
    const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
    const [codeSent, setCodeSent] = useState(false);
    const [showAlertCode, setShowAlertCode] = useState(false);

    const newData: DataSignup = {
        email: email, 
        username: username,
        password: password,
    };
    
    const newEmail: DataOTP = {
        email: email,
    }

    const newCode: DataCode = {
        email: email, 
        otp: codeDigits.join(''),
    }

    const closeAlertCode = () => {
        console.log('code lu : ' + newCode.otp);
        handlePost(newCode, 5, setError)
        setShowAlertCode(false);
        setCodeSent(true)
    };

    useEffect(() => {
        console.log('useEffect triggered with error:', error);
        if (error) {
            let message = '';
            if (error === 200 && emailSent && !codeSent) { 
                setShowAlertCode(true);
                setEmailSent(false); 
                message = 'Email sent';
            } else if (error === 200 && !emailSent && codeSent) { 
                setShowAlertCode(false);
                setCodeSent(false); 
                message = 'OTP correct';
                navigation.navigate('homePage');
            } else if (error === 201) {
                message = 'User created successfully';
                handlePost(newEmail, 4, setError)
                setEmailSent(true)
            } else if (error === 400 && !emailSent && !codeSent) {
                message = 'Invalid input or user already exists ' + error;
            } else if (error === 400 && (emailSent || codeSent)) {
                if (emailSent) setEmailSent(false); 
                else if (codeSent) setCodeSent(false); 
                message = 'Invalid input ' + error;
            } else if (error === 401 && !codeSent) {
                message = 'Email not found ' + error;
            } else if (error === 401 && (emailSent || codeSent) ) {
                message = 'Email not found ' + error;
                if (emailSent) setEmailSent(false);
                if (codeSent) setCodeSent(false); 
                setShowAlertCode(false);
            } else if (error === 402) {
                message = 'Wrong or expired OTP ' + error;
                setCodeSent(false)
                setShowAlertCode(false);
                navigation.navigate('signupPage');
            } else if (error === 500 && !emailSent && !codeSent) {
                message = 'User creation failed ' + error;
            } else if (error === 500 && emailSent && !codeSent) {
                setEmailSent(false); 
                message = 'Save failed ' + error;
            } else if (error === 500 && !emailSent && codeSent) {
                setCodeSent(false); 
                message = 'Failed to generate or send OTP ' + error;
            }  else {
                message = 'Error: ' + error;
            }
            Toast.show(message, { duration: Toast.durations.LONG });
        }
    }, [error,  emailSent, codeSent]);

    const SignUp = () => {
        handlePost(newData, 3, setError);
    };
    
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 

    return (
        <View style={styles.container}>
            {TemplateRangdong('Sign up')}
            <View style={styles.inputContainer}> 
                <ThemedView style={styles.containerTextinput}>
                    <TextInput
                        style={styles.input}
                        placeholder="username"
                        placeholderTextColor="#828282"
                        value={username}
                        onChangeText={newText => setUsername(newText)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="email@domain.com"
                        placeholderTextColor="#828282"
                        value={email}
                        onChangeText={newText => setEmail(newText)}
                    />
                    <View style={styles.row}>
                        <TextInput
                            style={styles.input}
                            placeholder="password"
                            placeholderTextColor="#828282"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={!showPassword}
                        />
                        <MaterialCommunityIcons 
                            name={showPassword ? 'eye' : 'eye-off'} 
                            size={24} 
                            color="#aaa"
                            style={styles.hide} 
                            onPress={toggleShowPassword} 
                        /> 
                    </View>
                </ThemedView>
            </View>        
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.navigate('loginPage')}>
                <ThemedText style={styles.buttonText}>Cancel</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={SignUp}>
                <ThemedText style={styles.buttonText}>Save</ThemedText>
                </TouchableOpacity>
            </View>
            {error === 200 && showAlertCode && (
                <CustomAlertBoxCode
                    visible={showAlertCode}
                    message="Enter the 6-digit code sent to your email (valid for 5 minutes)"
                    onConfirm={closeAlertCode}
                    confirmButtonText='Submit Code'
                    value={codeDigits.join('')} 
                    onChangeText={(text: string) => setCodeDigits(text.split(''))}
                />
            )}
        </View>
    )
}

export default SignupPage; 

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
        backgroundColor: '#AAB565',
        width: 85,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 30,
        color: 'black', 
    },
    inputContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 50,
    },
    buttonContainer: {
      flexDirection: 'row',
      paddingTop: 50,
      justifyContent: 'space-between',
    },
    cancelButton: {
      backgroundColor: '#C94A4A',
    },
    signupButton: {
      backgroundColor: '#5DA2A6', 
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        width: '100%',
    },
    hide: {
        width: 30,
        height: 30,
        right: 50,
        bottom: 12,
    },
});
