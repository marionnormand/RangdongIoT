import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomAlertBoxEdit from "@/components/CustomAlertBoxEdit";
import CustomAlertBoxFilter from "@/components/CustomAlertBoxFilter";
import { useFocusEffect } from '@react-navigation/native';
import { handleDeleteRequest } from './network/delete';
import { handleGetRequest } from './network/get';
import { useIsFocused } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './_layout';
import { useError } from './error/errorContext';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const FilterPage = ({ navigation }: any) => {
  const route = useRoute<RouteProp<RootStackParamList, 'filterPage'>>();
  const routeParams = route.params || {};
  const { dataFilter } = routeParams;

  const [showAlertEdit, setShowAlertEdit] = useState<boolean>(false);
  const [showAlertFilter, setShowAlertFilter] = useState<boolean>(false);
  const [selectedRectangle, setSelectedRectangle] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [idData, setId] = useState<number>(0);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [field, setFilterField] = useState<string>(dataFilter.field || '');
  const [value, setFilterValue] = useState<string>(dataFilter.value || '');
  const [isModified, setIsModified] = useState<boolean>(false);
  const { error, setError } = useError(); 
  
  const defaultImage = require('@/assets/images/react-logo.png');
  const [image, setImage] = useState(defaultImage);
  const isFocused = useIsFocused();

  const GoEdit = () => {
    navigation.navigate('editPage', { rectangle: selectedRectangle });
    setShowAlertEdit(false);
  };

  const handleOptionPress = () => {
    setShowAlertEdit(true);
  };

  const unShowBoxCancel = async () => {
    console.log(`Cancel button pressed`);
    setShowAlertEdit(false);
    setShowAlertFilter(false);
  };

  const unShowBoxEdit = async () => {
    console.log(`Delete pressed`);
    handleDeleteRequest(idData);
    setShowAlertEdit(false);
    getUpdate();
  };

  const handleNewPress = () => {
    setSelectedRectangle(null);
  };

  const getUpdate = async () => {
    try {
      console.log('field : ' + field + ' value : ' + value)
      const data = await handleGetRequest(setFetchedData, 'https://digitaldev.io.vn/todos/' + field + '/' + value);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUpdate();
      console.log(`MAJ des données`);
    }, [])
  );

  useEffect(() => {
    console.log('useEffect triggered with error:', error);
    if (error) {
      let message = '';
      console.log(error);
      if (error === 200) {
        message = 'Filter success';
        setShowAlertFilter(false);
      }
    }
    const intervalId = setInterval(() => {
      getUpdate();
    }, 1000);
  
    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage du composant
  }, [isFocused, error]); // Le tableau vide en second argument indique que cet effet ne dépend d'aucune variable, donc il ne s'exécute qu'une seule fois après le montage initial du composant

  const handleOptionPressRond = (index: number, item: any, id: number) => {
    setSelectedRectangle(item); // Mettre à jour l'état selectedRectangle
    setId(id); // Mettre à jour l'ID sélectionné
    setShowAlertEdit(true); // Afficher l'alerte
  };

  const goToFilter = () => {
    setShowAlertFilter(true); 
  };

  const goToHome = () => {
    navigation.navigate('homePage');
  };

  const handleFilterChange = (newField: string, newValue: string) => {
    setFilterField(newField);
    setFilterValue(newValue);
    setIsModified(true); // Marquer comme modifié après la première modification
    handleGetRequest(setFetchedData, 'https://digitaldev.io.vn/todos/' + newField + '/' + newValue);
    setShowAlertFilter(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContainer}>
        <Text style={styles.text}>
          <Text style={styles.titleText}>Filter</Text>{'\n'}
          <Text>Field : {field}</Text>{'\n'}
          <Text>Value : {value}</Text>
        </Text>
        <TouchableOpacity style={[styles.buttonFilter, { marginTop: 20 }]} onPress={goToFilter}>
          <ThemedText style={styles.buttonText}>Filter</ThemedText>
        </TouchableOpacity>
      </View>
        
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} indicatorStyle="black">
        {fetchedData.map((item, index) => (
          <View key={index} style={styles.rectangle}>
            <View style={{ alignItems: 'flex-start', right: 10 }}>
              <ThemedText style={styles.rectangleText}>
                <ThemedText style={styles.rectangleTextBold}>name : </ThemedText>
                {item.name}
              </ThemedText>
              <ThemedText style={styles.rectangleText}>
                <ThemedText style={styles.rectangleTextBold}>mac : </ThemedText>
                {item.mac}
              </ThemedText>
              <ThemedText style={styles.rectangleText}>
                <ThemedText style={styles.rectangleTextBold}>status : </ThemedText>
                {item.status.toString()}
              </ThemedText>
            </View>

            <TouchableOpacity onPress={() => handleOptionPressRond(index, item, item.id)} style={styles.touchable}>
              {selectedOption === index && (
                <View style={styles.largeCircle}>
                  <View style={styles.roundContainer}>
                    {[...Array(3)].map((_, optionIndex) => (
                      <View
                        key={optionIndex}
                        style={[
                          styles.optionDot,
                          selectedOption === index && styles.selectedOptionDot
                        ]}
                      />
                    ))}
                  </View>
                </View>
              )}
              {selectedOption !== index && (
                <View style={styles.largeCircle}>
                  <View style={styles.roundContainer}>
                    {[...Array(3)].map((_, optionIndex) => (
                      <View
                        key={optionIndex}
                        style={[
                          styles.optionDot,
                        ]}
                      />
                    ))}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.buttonCancel} onPress={goToHome}>
        <ThemedText style={styles.buttonTextCancel}>Cancel</ThemedText>
      </TouchableOpacity>

      {showAlertEdit && selectedRectangle && (
        <CustomAlertBoxEdit
          visible={showAlertEdit}
          message='Do you want to update data?'
          onCancel={unShowBoxCancel}
          onDelete={unShowBoxEdit}
          onEdit={GoEdit}
          editButtonText={'Edit'}
          deleteButtonText={'Delete'}
          cancelButtonText={'Cancel'}
          showCancelButton={true}
          showExtraButton={true}
        />
      )}
      {showAlertFilter && (
        <CustomAlertBoxFilter 
          visible={showAlertFilter}
          message= 'Filter'
          onFilter={() => handleFilterChange(field, value)}
          filterButtonText={'Filter'}
          value={field}
          valueInput={value}
          textInput={'Value'}
          onChangeText={(text: string) => setFilterValue(text)}
          onChangeDropdown={(value) => setFilterField(value)}
          onClose={unShowBoxCancel}
        />
      )}
    </View>
  );
};

export default FilterPage; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  centeredContainer: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingTop: 15,
    color: '#933434',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
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
  buttonFilter: {
    width: 90,
    height: 30,
    borderRadius: 6,
    //position: 'absolute',
    //right: 225, 
    backgroundColor: '#5DA2A6',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rectangle: {
    width: 320,
    height: 68,
    backgroundColor: '#BE9F9F70', // Couleur de fond du rectangle
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 5, // Marge horizontale entre les rectangles
    borderRadius: 10, // Arrondi des coins du rectangle
  },
  rectangleText: {
    color: '#000000', // Couleur du texte du rectangle
    fontSize: 12, // Taille de police du texte du rectangle
    left: 22,
  },
  rectangleTextBold: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollView: {
    marginTop: 20,
    flex: 1, 
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: windowWidth - 200,
    backgroundColor: '#FFF',
    flex: 1,
  },
  roundContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  optionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    marginVertical: 3,
  },
  selectedOptionDot: {
    backgroundColor: '#ffffff',
  },
  largeCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: -15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF1A',
  },
  touchable: {
    position: 'absolute',
    right: 16,
    top: '10%',
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    //padding: 10,
    marginLeft: 15,
    marginRight: 220,
    //width: 40,
    //height: 50,
  },
  buttonCancel: {
    backgroundColor: '#C94A4A',
    justifyContent: 'center',
    alignItems: 'center', 
    width: 85,
    height: 63,
    borderRadius: 10,
    marginTop: 20,
    left: 20,
    marginBottom: 30,
  },
  buttonTextCancel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    //marginTop: 10, 
  },
  
});
