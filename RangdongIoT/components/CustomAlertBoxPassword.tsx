import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextStyle, ViewStyle, TextInput, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from 'expo-blur';

interface CustomAlertBoxProps {
  visible: boolean;
  message: React.ReactNode;
  onConfirm: () => void;
  confirmButtonText?: string; 
  textInput?: string; 
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CustomAlertBoxPassword: React.FC<CustomAlertBoxProps> = ({ visible, message, onConfirm, confirmButtonText, textInput}) => {
  const [inputText, setInputText] = useState(textInput || '');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <TouchableWithoutFeedback onPress={onConfirm}>
        <BlurView intensity={10} style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.container}>
              <Text style={styles.message}>{message}</Text>
              <TextInput
                style={styles.input}
                placeholder={textInput}
                placeholderTextColor="#828282"
                value={inputText}
                onChangeText={setInputText}
              />
              <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                <Text style={styles.buttonText}>{confirmButtonText}</Text>
              </TouchableOpacity>
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
  input: TextStyle;
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
    marginBottom: 20,
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
  input: {
    width: windowWidth - 70,
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 25,
    backgroundColor: 'white',
  },
});

export default CustomAlertBoxPassword;
