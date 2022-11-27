import {StyleSheet, Text, View, BackHandler, Alert} from 'react-native';
import React from 'react';
import Button from '../components/Button';

const Home = ({startQuiz}) => {
  const exitApp = () => {
    Alert.alert('', 'Exit the app?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'OK', onPress: () => BackHandler.exitApp()},
    ]);
  };
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Quiz App</Text>
      </View>
      <Button title="Start Quiz" onPress={startQuiz} buttonColor="#54B435" />
      <Button title="Exit" onPress={exitApp} buttonColor="#E97777" />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 40,
  },
  titleText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
});
