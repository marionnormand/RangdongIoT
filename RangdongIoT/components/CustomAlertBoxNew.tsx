import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

interface CustomAlertBoxProps {
  visible: boolean;
  message: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  showCancelButton?: boolean;
  cancelButtonText?: string; 
  extraButtonText?: string; 
  confirmButtonText?: string; 
  showExtraButton?: boolean;  
}

const CustomAlertBoxNew: React.FC<CustomAlertBoxProps> = ({ visible, message, onCancel, onConfirm, showCancelButton = false, cancelButtonText = 'Cancel', confirmButtonText = 'Add'}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <BlurView intensity={10} style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
              <Text style={styles.buttonText}>{confirmButtonText}</Text>
            </TouchableOpacity>
            {showCancelButton && (
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                <Text style={styles.buttonText}>{cancelButtonText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

interface Styles {
  overlay: ViewStyle;
  container: ViewStyle;
  message: TextStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  cancelButton: ViewStyle;
  confirmButton: ViewStyle;
  buttonText: TextStyle;
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
    width : 140,
  },
  message: {
    fontSize: 12,
    marginBottom: 1,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  cancelButton: {
    backgroundColor: '#C94A4A',
  },
  confirmButton: {
    backgroundColor: '#65B56D',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CustomAlertBoxNew;