import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Text, TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  // States
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [hidePassword, setHidePassword] = useState(true);
  //   useEffect
  useEffect(() => {
    checkLogin();
  }, []);
  // Utility Functions
  const clearStates = () => {
    setEmail('');
    setPassword('');
  };
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };
  const registerScreenHandler = () => {
    console.log('asd');
  };
  const checkLogin = async () => {
    // Reading String
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    if (email && password) {
      navigation.navigate('Home');
    }
    // Reading Object
    // const user = await AsyncStorage.getItem('userInfo');
    // if (user) {
    //   navigation.navigate('Home');
    // }
  };
  const loginHandler = async () => {
    try {
      // Storing string values
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      navigation.navigate('Home');
      // Storing object
      //   const userInfo = {
      //     email: email,
      //     password: password,
      //   };
      //   await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
      console.log(error);
    }
  };
  const removeLoginCredentials = async () => {
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('password');
  };
  const getAllKeys = async () => {
    keys = await AsyncStorage.getAllKeys();
    console.log('Keys');
    //  ['email', 'password', 'userInfo']
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
