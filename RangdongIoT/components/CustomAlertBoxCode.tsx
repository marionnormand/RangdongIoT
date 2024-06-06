import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextStyle, ViewStyle, TextInput, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';

interface CustomAlertBoxCodeProps {
  visible: boolean;
  message: React.ReactNode;
  onConfirm: () => void;
  confirmButtonText?: string;
  value: string;
  onChangeText: (text: string) => void;
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CustomAlertBoxCode: React.FC<CustomAlertBoxCodeProps> = ({ visible, message, onConfirm, confirmButtonText, value, onChangeText }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const refs = useRef<(TextInput | null)[]>(Array.from({ length: 6 }, () => null));

  useEffect(() => {
    if (visible) {
      setCode(['', '', '', '', '', '']);
      // Focus on the first TextInput when the component becomes visible
      if (refs.current[0]) {
        refs.current[0].focus();
      }
    }
  }, [visible]);

  const handleCodeChange = (index: number, text: string) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text.length === 1 && index < code.length - 1) {
        refs.current[index + 1]?.focus(); 
    }
};


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <TouchableWithoutFeedback onPress={onConfirm}>
        <BlurView intensity={10} style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={styles.container}>
              <Text style={styles.message}>{message}</Text>
              <View style={styles.codeInputContainer}>
                <View style={styles.codeInputs}>
                  {code.map((digit, index) => (
                    <TextInput
                      key={index}
                      style={styles.codeInput}
                      maxLength={1}
                      keyboardType="numeric"
                      value={digit}
                      onChangeText={(text) => handleCodeChange(index, text)}
                      ref={(ref) => { refs.current[index] = ref; }}
                    />
                  ))}
                </View>
                <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                  <ThemedText style={styles.buttonText}>{confirmButtonText}</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

interface Styles {
  overlay: ViewStyle;
  container: ViewStyle;
  message: TextStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  confirmButton: ViewStyle;
  buttonText: TextStyle;
  codeInputContainer: ViewStyle;
  instructionText: TextStyle;
  codeInputs: ViewStyle;
  codeInput: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#B29C82',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width : windowWidth - 50,
  },
  message: {
    fontSize: 12,
    marginBottom: 10,
    marginTop:10,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 10,
    width: 120,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#5DA2A6',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
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
  codeInputs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  codeInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'white',
    marginRight: 10,
  },
});

export default CustomAlertBoxCode;
