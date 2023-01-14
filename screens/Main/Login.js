import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Text, TextInput, Button} from 'react-native-paper';

const Login = () => {
  // States
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
  // Utility Functions
  const clearStates = () => {
    setEmail('');
    setPassword('');
  };
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };
  const registerScreenHandler = () => {
    navigation.navigate('Register');
  };
  const loginHandler = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    const response = await fetch(
      `http://${IP}/FlowerAPITask/api/users/login`,
      requestOptions,
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      {/* Container */}
      <View style={styles.container}>
        {/* Input Container */}
        <View style={styles.inputContainer}>
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
          <Text style={styles.text} onPress={registerScreenHandler}>
            Create a new account
          </Text>
        </View>
        {/* Button Container */}
        <Button mode="contained" onPress={loginHandler}>
          Login
        </Button>
      </View>
    </>
  );
};

export default Login;

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
