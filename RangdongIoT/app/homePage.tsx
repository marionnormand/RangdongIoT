import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomAlertBoxNew from "@/components/CustomAlertBoxNew";
import CustomAlertBoxEdit from "@/components/CustomAlertBoxEdit";
import { useFocusEffect } from '@react-navigation/native';
import { handleDeleteRequest } from './network/delete';
import { handleGetRequest } from './network/get';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const HomePage = ({ navigation }: any) => {
  const [showAlertNew, setShowAlertNew] = useState<boolean>(false);
  const [showAlertEdit, setShowAlertEdit] = useState<boolean>(false);
  const [selectedRectangle, setSelectedRectangle] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [idData, setId] = useState<number>(0);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  
  const defaultImage = require('@/assets/images/react-logo.png');
  const [image, setImage] = useState(defaultImage);
  const isFocused = useIsFocused();

  const GoEdit = () => {
    navigation.navigate('editPage', { rectangle: selectedRectangle });
    setShowAlertEdit(false);
  };

  const GoNew = () => {
    navigation.navigate('newPage');
    setShowAlertNew(false);
  };

  const handleOptionPress = () => {
    setShowAlertEdit(true);
  };

  const unShowBoxCancel = async () => {
    console.log(`Cancel button pressed`);
    setShowAlertNew(false);
    setShowAlertEdit(false);
  };

  const unShowBoxEdit = async () => {
    console.log(`Delete pressed`);
    handleDeleteRequest(idData);
    setShowAlertEdit(false);
    getUpdate();
  };

  const handleNewPress = () => {
    setSelectedRectangle(null);
    setShowAlertNew(true);
  };

  const getUpdate = async () => {
    try {
      const data = await handleGetRequest(setFetchedData);
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
    if (isFocused) {
      loadImage();
    } 
    const intervalId = setInterval(() => {
      getUpdate();
    }, 5000);
  
    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage du composant
  }, [isFocused]); // Le tableau vide en second argument indique que cet effet ne dépend d'aucune variable, donc il ne s'exécute qu'une seule fois après le montage initial du composant
  
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

  const handleOptionPressRond = (index: number, item: any, id:number) => {
    setSelectedRectangle(item); // Mettre à jour l'état selectedRectangle
    setId(id); // Mettre à jour l'ID sélectionné
    setShowAlertEdit(true); // Afficher l'alerte
  };

  const goToFilter = () => {
    navigation.navigate('filterPage', {filter});
  };

  const openEdit = () => {
    navigation.navigate('editProfile');
  }

  return (
    <View style={styles.container}>
      <View style={styles.editProfileContainer}>
        <TouchableOpacity onPress={openEdit}>
          <Image source={image} style={[styles.image, { width: 100, height: 100 }]} />
          <ThemedText style={styles.textProfile}>Edit profile</ThemedText>
        </TouchableOpacity>
      </View>
      <ThemedView style={styles.row}>
        <TextInput
          style={[styles.input, {paddingLeft: 10}]}
          placeholder="Filter"
          placeholderTextColor="#828282"
          value={filter}
          onChangeText={text => setFilter(text)}
        />
        <TouchableOpacity style={styles.buttonFilter} onPress={goToFilter}>
          <ThemedText style={styles.buttonText}>Filter</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNew} onPress={handleNewPress}>
          <ThemedText style={styles.buttonText}>New</ThemedText>
        </TouchableOpacity>
      </ThemedView>

     
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

      {showAlertNew && (
        <CustomAlertBoxNew
          visible={showAlertNew}
          message={
            <Text>
              Do you want to create new data?
            </Text>
          }
          onCancel={unShowBoxCancel}
          onConfirm={GoNew}
          confirmButtonText={'New'}
          cancelButtonText={'Cancel'}
          showCancelButton={true}
        />
      )}
      {showAlertEdit && selectedRectangle && (
        <CustomAlertBoxEdit
          visible={showAlertEdit}
          message={
            <View>
              <Text>Do you want to update data?</Text>
            </View>
          }
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
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
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
  buttonNew: {
    width: 90,
    height: 30,
    borderRadius: 6,
    position: 'absolute',
    right: 20, 
    backgroundColor: '#AAB565',
    justifyContent: 'center',
    alignItems: 'center',
  },  
  buttonFilter: {
    width: 60,
    height: 24,
    borderRadius: 10,
    position: 'absolute',
    right: 150, 
    backgroundColor: '#5DA2A6',
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
    //maxHeight: windowHeight - 350,
    //maxWidth: windowWidth - 50
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
  editProfileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 0, 
    marginBottom: 5,
  },
  textProfile: {
    color: '#933434',
    textAlign: 'center',
    marginTop: 10, 
  },
});
