import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';

const Button = ({title, onPress}) => {
  const handlePress = () => {
    onPress();
  };
  return (
    <Pressable style={styles.buttonContainer} onPress={handlePress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    padding: 20,
    backgroundColor: '#2192FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    width: '40%',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
