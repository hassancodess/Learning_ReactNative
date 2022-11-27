import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';

const Button = ({title, onPress, buttonColor}) => {
  const handleEvent = () => {
    onPress();
  };
  return (
    <Pressable
      style={[styles.buttonContainer, {backgroundColor: buttonColor}]}
      onPress={handleEvent}
      android_ripple={{color: 'white'}}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: 'red',
    width: '60%',
    marginBottom: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
});
