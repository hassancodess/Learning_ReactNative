import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput
        label="Enter Email"
        value={email}
        mode={'outlined'}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Enter Password"
        value={password}
        mode={'outlined'}
        onChangeText={text => setPassword(text)}
        style={styles.input}
      />
      <Text style={styles.text}>
        Don't have an account? <Text style={styles.signUpText}>SignUp</Text>
      </Text>
      <Button mode="contained">Press Me</Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'right',
    marginBottom: 10,
  },
  signUpText: {
    color: 'purple',
  },
});
