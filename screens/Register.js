import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

const Register = () => {
  const [name, setName] = React.useState('');

  return (
    <View>
      <TextInput
        label="Enter Email"
        value={name}
        onChangeText={text => setText(text)}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
