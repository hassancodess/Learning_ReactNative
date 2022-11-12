import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';

const Button = ({text, onPress}) => {
  const handlePress = () => {
    onPress();
  };
  return (
    <Pressable onPress={handlePress} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#6C4AB6',
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CFF5E7',
  },
});
