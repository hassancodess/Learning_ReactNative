import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

const Home = ({navigation}) => {
  const navigateProductsScreen = () => {
    navigation.navigate('ProductsList');
  };
  const navigateAddProductScreen = () => {
    navigation.navigate('AddProduct');
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={navigateAddProductScreen}>
          Add Product Screen
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={navigateProductsScreen}>
          Products List Screen
        </Button>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '60%',
  },
  button: {
    marginVertical: 10,
  },
});
