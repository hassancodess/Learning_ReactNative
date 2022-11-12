import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import Button from './Button';

const Input = () => {
  const [text, onChangeText] = useState('asdasd');

  const handleAdd = () => {
    console.log('handle Add');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add a Wish</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Button onPress={handleAdd} text="ADD" />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#393E46',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#393E46',
    paddingHorizontal: 15,
    marginRight: 10,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#6C4AB6',
  },
});
