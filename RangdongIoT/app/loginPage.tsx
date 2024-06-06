import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, TextInput, Text, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomAlertBoxPassword from "@/components/CustomAlertBoxPassword";
import CustomAlertBoxCode from "@/components/CustomAlertBoxCode";
import { useError } from './error/errorContext';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Toast from 'react-native-root-toast'; 
import SMSVerifyCode from 'react-native-sms-verifycode';

import { TemplateRangdong } from './templates/templateRangdong'
import { DataAuthen, DataOTP, DataCode } from './network/DataToSend';
import { handlePost } from './network/post'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const LoginPage = ({ navigation }: any) => {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [showPassword, setShowPassword] = useState(false); 
    const [showAlertEmail, setShowAlertEmail] = useState(false);
    const [showAlertCode, setShowAlertCode] = useState(false)
    const { error, setError } = useError(); 
    const [ email, setEmail ] = useState(''); 
    const [ code, setCode ] = useState(''); 
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const newData: DataAuthen = {
        username: username,
        password: password,
    };

    const newEmail: DataOTP = {
        email: email,
    }

    const newCode: DataCode = {
        code: code,
    }

    //const smsVerifier = new SmsVerifyCode();


    useEffect(() => {
        console.log('useEffect triggered with error:', error);
        if (error) {
            let message = '';
            if (error === 200 && !emailSent) {
                message = 'Login success';
                navigation.navigate('homePage');
            } else if (error === 200 && emailSent) { 
                setShowAlertCode(true);
                //setShowCodeInput(true);
            } else if (error === 400) {
                message = 'Invalid input ' + error;
            } else if (error === 401) {
                message = 'Invalid credentials ' + error;
            } else if (error === 500) {
                message = 'Failed to generate or send OTP ' + error;
            } else {
                message = 'Error: ' + error;
            }
            Toast.show(message, { duration: Toast.durations.LONG });
        }
    }, [error, emailSent]);
    
    const closeAlertEmail = () => {
        console.log('email lu : ' + email)
        handlePost(newEmail, 4, setError)
        setShowAlertEmail(false);
        //setShowCodeInput(true); 
        setEmailSent(true); 
        
    };
    

    const closeAlertCode = () => {
        console.log('code lu : ' + newCode)
        handlePost(newCode, 5, setError)
        setShowAlertCode(false);
    };

    const openAlert = () => {
        setShowAlertEmail(true);
    };

    const buttonLogin = () => {
        handlePost(newData, 2, setError); 
    }

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    };
    

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
                visible={showAlertEmail}
                message="Enter your email to send a new password"
                onConfirm={closeAlertEmail}
                confirmButtonText='Send email'
                textInput='email@domain.com'
                value={email}
                onChangeText={(text: string) => setEmail(text)}
            />
            <CustomAlertBoxCode
                visible={showAlertCode}
                message="Enter the 6-digit code sent to your email (valid for 5 minutes)"
                onConfirm={closeAlertCode}
                confirmButtonText='Submit Code'
                value={code}
                onChangeText={(text: string) => setCode(text)}
            />
        </View>
    );
}
/*{showCodeInput && (
                <View style={styles.codeInputContainer}>
                    <ThemedText style={styles.instructionText}>Enter the 6-digit code sent to your email (valid for 5 minutes)</ThemedText>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter code"
                        placeholderTextColor="#828282"
                        value={code}
                        onChangeText={text => setCode(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleCodeSubmit}>
                        <ThemedText style={styles.buttonText}>Submit Code</ThemedText>
                    </TouchableOpacity>
                </View>
            )}*/
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
        marginBottom: -15,
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
        //marginTop: 0,
    },
    text: {
        color: '#933434',
        marginTop: 30,
        marginBottom: 10,
        fontSize: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        width: '100%',
        paddingTop: 30,
    },
    hide: {
        width: 30,
        height: 30,
        right: 50,
        top: 26,
    },
    codeInputContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    instructionText: {
        fontSize: 16,
        color: '#933434',
        marginBottom: 10,
    },
});