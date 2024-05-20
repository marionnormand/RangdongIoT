import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const EditPage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo_vietnam.png')}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});

export default EditPage;
