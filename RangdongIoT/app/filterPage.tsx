import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomAlertBoxNew from "@/components/CustomAlertBoxNew";
import CustomAlertBoxEdit from "@/components/CustomAlertBoxEdit";
import { useFocusEffect, useRoute, RouteProp } from '@react-navigation/native';
import { handleDeleteRequest } from './network/delete';
import { handleGetRequest } from './network/get';
import { RootStackParamList } from './_layout';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const FilterPage = ({ navigation }: any) => {
  const [showAlertNew, setShowAlertNew] = useState<boolean>(false);
  const [showAlertEdit, setShowAlertEdit] = useState<boolean>(false);
  const [selectedRectangle, setSelectedRectangle] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [idData, setId] = useState<number>(0);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [newFilter, setFilter] = useState('');


  const route = useRoute<RouteProp<RootStackParamList, 'filterPage'>>();
  const { filter } = route.params;

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
    const intervalId = setInterval(() => {
      getUpdate();
    }, 5000);
    
    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage du composant
  }, []); // Le tableau vide en second argument indique que cet effet ne dépend d'aucune variable, donc il ne s'exécute qu'une seule fois après le montage initial du composant
  

  const handleOptionPressRond = (index: number, item: any, id:number) => {
    setSelectedRectangle(item); // Mettre à jour l'état selectedRectangle
    setId(id); // Mettre à jour l'ID sélectionné
    setShowAlertEdit(true); // Afficher l'alerte
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.row}>
        <TextInput
          style={[styles.input, {paddingLeft: 10}]}
          placeholder={filter}
          placeholderTextColor="#828282"
          value={newFilter}
          onChangeText={text => setFilter(text)}
        />
        <TouchableOpacity style={styles.buttonFilter}>
          <ThemedText style={styles.buttonText}>Filter</ThemedText>
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

export default FilterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 200,
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
  button: {
    backgroundColor: '#AAB565',
    width: 80,
    height: 24,
    position: 'absolute',
    right: 20, // Ajustez cette valeur selon votre mise en page
    top: 20, // Ajustez cette valeur selon votre mise en page
    borderRadius: 10,
  },  
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  }, 
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
  },
  scrollContainer: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  buttonFilter: {
    width: 60,
    height: 24,
    borderRadius: 10,
    position: 'absolute',
    right: 150, 
    backgroundColor: '#5DA2A6',
  },
});
