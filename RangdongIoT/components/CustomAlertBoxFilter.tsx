import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextStyle, ViewStyle, TextInput, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from 'expo-blur';
import { Dropdown } from 'react-native-element-dropdown';

const windowWidth = Dimensions.get('window').width;

interface CustomAlertBoxProps {
  visible: boolean;
  message: React.ReactNode;
  onFilter?: () => void; 
  filterButtonText?: string; 
  showExtraButton?: boolean;  
  textInput?: string; 
  value: string;
  valueInput: string;
  onChangeText: (text: string) => void;
  onChangeDropdown: (value: string) => void; 
  onClose: () => void; 
}

const data = [
  { label: 'name', value: '1' },
  { label: 'mac', value: '2' },
  { label: 'status', value: '3' },
  { label: 'id', value: '4' },
];

const CustomAlertBoxFilter: React.FC<CustomAlertBoxProps> = ({ 
  visible, 
  message, 
  onFilter = () => {}, 
  filterButtonText = 'Filter', 
  textInput = '', 
  value, 
  valueInput, 
  onChangeText = () => {},
  onChangeDropdown = () => {},
  onClose = () => {}, // Default empty function for onClose
}) => {
  
  const [isFocus, setIsFocus] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(value);  // <-- Initialisation correcte de la valeur du dropdown

  const handleDropdownChange = (item: any) => {
    setIsFocus(false);
    setDropdownValue(item.label);  // <-- Mettre à jour la valeur locale immédiatement
    onChangeDropdown(item.label);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} >
      <TouchableWithoutFeedback onPress={onClose}>
        <BlurView intensity={10} style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <Text style={styles.message}>{message}</Text>
              <Dropdown
                style={[styles.dropdown, { marginBottom: 10 }]}
                placeholderStyle={[styles.placeholderStyle, styles.placeholderText]}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                search
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select field' : '...'}
                searchPlaceholder="Search..."
                value={dropdownValue}  // <-- Utiliser la valeur de l'état local pour afficher la sélection
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={handleDropdownChange}  // <-- Mettre à jour l'état local lors de la sélection
              />
              <TextInput 
                style={[styles.input, { paddingTop: 10 }]}
                placeholder={textInput}
                placeholderTextColor="#828282"
                value={valueInput}
                onChangeText={onChangeText}
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.filterButton]} onPress={onFilter}>
                  <Text style={styles.buttonText}>{filterButtonText}</Text>
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
  filterButton: ViewStyle;
  buttonText: TextStyle;
  dropdown: ViewStyle;
  placeholderStyle: ViewStyle;
  selectedTextStyle: ViewStyle;
  inputSearchStyle: ViewStyle; 
  input: ViewStyle;
  placeholderText: TextStyle;
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
    width: 180,
  },
  message: {
    fontSize: 12,
    marginBottom: 1,
    textAlign: 'center',
    flexWrap: 'wrap',
    paddingBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  filterButton: {
    backgroundColor: '#65B56D',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  dropdown: {
    height: 40,
    width: 150,
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  placeholderText: {
    color: '#828282', 
    fontSize: 14, 
  },
  placeholderStyle: {},
  selectedTextStyle: {
  },
  inputSearchStyle: {},
  input: {
    width: 150,
    height: 40,
    borderColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
});

export default CustomAlertBoxFilter;
