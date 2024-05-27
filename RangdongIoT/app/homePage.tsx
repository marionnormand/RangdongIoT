import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomAlertBoxNew from "@/components/CustomAlertBoxNew";
import CustomAlertBoxEdit from "@/components/CustomAlertBoxEdit";
import { useFocusEffect } from '@react-navigation/native';
import { handleDeleteRequest } from './network/delete';
import { handleGetRequest } from './network/get';


const windowHeight = Dimensions.get('window').height;

const HomePage = ({ navigation }: any) => {
  const [showAlertNew, setShowAlertNew] = useState<boolean>(false);
  const [showAlertEdit, setShowAlertEdit] = useState<boolean>(false);
  const [selectedRectangle, setSelectedRectangle] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [idData, setId] = useState<number>(0);
  const [fetchedData, setFetchedData] = useState<any[]>([]);

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
    console.log(`New pressed`);
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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.centeredText}>RangdongIoT</ThemedText>
        <Image
          source={require('@/assets/images/logo_vietnam.png')}
          style={styles.flag_viet}
        />
        <Image
          source={require('@/assets/images/rang-dong-icon.png')}
          style={styles.rang}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.centeredTextSub}>Database</ThemedText>
      </ThemedView>
      <ThemedView style={styles.scrollContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNewPress}>
          <ThemedText style={styles.buttonText}>New</ThemedText>
        </TouchableOpacity>
        <ScrollView style={styles.scrollView} indicatorStyle="black">
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
      </ThemedView>

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
    paddingBottom : 65
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 120,
  },
  flag_viet: {
    width: 58,
    height: 65,
    position: 'absolute',
    left: 25, // Aligner l'image à gauche
    top: 0, // Facultatif : positionner l'image au sommet
    resizeMode: 'contain',
    zIndex: 1,
  },
  rang: {
    width: 58,
    height: 55,
    position: 'absolute',
    right: 25, // Aligner l'image à gauche
    top: 0, // Facultatif : positionner l'image au sommet
    resizeMode: 'contain',
    zIndex: 1,
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
    maxHeight: windowHeight - 400,
  },
  scrollContainer: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    backgroundColor: '#FFF',
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
    right: 7,
    top: '10%',
  },
});
