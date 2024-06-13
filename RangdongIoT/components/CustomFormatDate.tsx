import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Keyboard } from 'react-native';

interface CustomFormatDateProps {
    value?: string;
    onChangeText: (text: string) => void;
}

const CustomFormatDate: React.FC<CustomFormatDateProps> = ({ value = '01/01/1990', onChangeText }) => {
    const initialCode = value.split('/');
    const [code, setCode] = useState([
        initialCode[0] || '',
        initialCode[1] || '',
        initialCode[2] || ''
    ]);

    const refs = useRef<(TextInput | null)[]>(Array.from({ length: 3 }, () => null));

    useEffect(() => {
        if (value) {
            const initialCode = value.split('/');
            setCode([
                initialCode[0] || '',
                initialCode[1] || '',
                initialCode[2] || ''
            ]);
        }
    }, [value]);

    const handleCodeChange = (index: number, text: string) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
        onChangeText(newCode.join('/')); // Pass the formatted string to the parent component

        if (text.length === (index === 2 ? 4 : 2) && index < code.length - 1) {
            refs.current[index + 1]?.focus();
        }

        // Check if all fields are filled
        if (newCode[0].length === 2 && newCode[1].length === 2 && newCode[2].length === 4) {
            Keyboard.dismiss();
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.codeInput, styles.monthInput]}
                maxLength={2}
                keyboardType="numeric"
                value={code[0]}
                onChangeText={(text) => handleCodeChange(0, text)}
                ref={(ref) => { refs.current[0] = ref; }}
            />
            <Text style={styles.separator}> / </Text>
            <TextInput
                style={[styles.codeInput, styles.dayInput]}
                maxLength={2}
                keyboardType="numeric"
                value={code[1]}
                onChangeText={(text) => handleCodeChange(1, text)}
                ref={(ref) => { refs.current[1] = ref; }}
            />
            <Text style={styles.separator}> / </Text>
            <TextInput
                style={[styles.codeInput, styles.yearInput]}
                maxLength={4}
                keyboardType="numeric"
                value={code[2]}
                onChangeText={(text) => handleCodeChange(2, text)}
                ref={(ref) => { refs.current[2] = ref; }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    codeInput: {
        width: 30,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        textAlign: 'center',
        backgroundColor: 'white',
        marginHorizontal: 2,
    },
    monthInput: {
        width: 40,
    },
    dayInput: {
        width: 40,
    },
    yearInput: {
        width: 60,
    },
    separator: {
        fontSize: 18,
        paddingHorizontal: 2,
    },
});

export default CustomFormatDate;
