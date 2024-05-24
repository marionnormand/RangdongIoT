import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomAlertBoxNew from "@/components/CustomAlertBoxNew";
import CustomAlertBoxEdit from "@/components/CustomAlertBoxEdit";
import { useFocusEffect } from '@react-navigation/native';
import { handleDeleteRequest } from './network/delete';
import { handleGetRequest } from './network/get';

const HomePage = ({ navigation }: any) => {
  const [showAlertNew, setShowAlertNew] = useState<boolean>(false);
  const [showAlertEdit, setShowAlertEdit] = useState<boolean>(false);
  const [selectedRectangle, setSelectedRectangle] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [toggleValue, setToggleValue] = useState<boolean>(false);

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
    handleDeleteRequest();
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

  const handleOptionPressRond = (index: number, item: any) => {
    setSelectedOption(index === selectedOption ? null : index);
    setSelectedRectangle(index === selectedOption ? null : item);
    setShowAlertEdit(true);
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.centeredText}>RangdongIoT</ThemedText>
      </ThemedView>
      <Image
        source={require('@/assets/images/logo_vietnam.png')}
        style={styles.flag_viet}
      />
      <Image
        source={require('@/assets/images/rang-dong-icon.png')}
        style={styles.rang}
      />
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

              <TouchableOpacity onPress={() => handleOptionPressRond(index, item)} style={styles.touchable}>
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
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 120,
  },
  flag_viet: {
    width: 76,
    height: 65,
    position: 'absolute',
    marginLeft: 20,
    marginTop: 120,
    zIndex: 1,
  },
  rang: {
    width: 58,
    height: 55,
    position: 'absolute',
    marginHorizontal: 280,
    marginTop: 120,
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
    left: 100,
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
    height: 65,
    backgroundColor: '#BE9F9F70',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    marginVertical: 5,
    borderRadius: 10,
  },
  rectangleText: {
    color: '#000000',
    fontSize: 12,
    textAlign: 'left',
    right: 80,
    alignItems: 'flex-start'
  },
  rectangleTextBold: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollView: {
    maxHeight: 520,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF1A',
  },
  touchable: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -25 }],
  },
});
