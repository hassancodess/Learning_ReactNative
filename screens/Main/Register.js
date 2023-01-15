import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Text, TextInput, Button} from 'react-native-paper';
const Register = () => {
  //   States
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [hidePassword, setHidePassword] = useState(true);
  //   Navigation
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  //   IP
  const IP = '192.168.100.80';
  //   useEffect
  useEffect(() => {
    clearStates();
  }, [isFocused]);
  //   Utility Functions
  const clearStates = () => {
    setName('');
    setEmail('');
    setPassword('');
  };
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };
  const LoginScreenHandler = () => {
    navigation.navigate('Login');
  };

  const registerHandler = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      };

      const response = await fetch(
        `http://${IP}/FlowerAPITask/api/users/signup`,
        requestOptions,
      );
      const data = await response.json();
      LoginScreenHandler();
    } catch (error) {
      console.log('ERROR: RegisterHandler');
    }
  };
  return (
    <>
      {/* Container */}
      <View style={styles.container}>
        {/* Input Container */}
        <View style={styles.inputContainer}>
          <TextInput
            label="Name"
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            label="Email"
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            label="Password"
            style={styles.input}
            value={password}
            secureTextEntry={hidePassword}
            right={
              hidePassword ? (
                <TextInput.Icon icon="eye-off" onPress={toggleHidePassword} />
              ) : (
                <TextInput.Icon icon="eye" onPress={toggleHidePassword} />
              )
            }
            onChangeText={text => setPassword(text)}
          />
        </View>
        {/* Text Strip Container */}
        <View style={styles.textContainer}>
          <Text style={styles.text} onPress={LoginScreenHandler}>
            Already have an account? Login
          </Text>
        </View>
        {/* Button Container */}
        <Button mode="contained" onPress={registerHandler}>
          Register
        </Button>
      </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 18,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    marginVertical: 10,
  },
  textContainer: {
    flexDirection: 'row-reverse',
    marginBottom: 20,
  },
  text: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
});
