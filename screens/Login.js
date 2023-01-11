import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AuthContext from '../context/AuthContext';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(true);
  const {login, isAuth, logout, userInfo} = useContext(AuthContext);
  // Navigation
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  // Clear State when in Focus - CASE: if users presses back button
  useEffect(() => {
    if (isFocused) {
      setEmail('');
      setPassword('');
      logout();
    }
  }, [isFocused]);
  // Navigate to Home Screen after Button Click
  useEffect(() => {
    if (isAuth) {
      navigation.navigate('Home');
    }
  }, [isAuth]);
  // Toggle Secure Text Entry
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Calls login method from AuthContext
  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <View style={styles.container}>
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
        onChangeText={text => setPassword(text)}
        secureTextEntry={showPassword ? true : false}
        right={
          showPassword ? (
            <TextInput.Icon icon="eye" onPress={toggleShowPassword} />
          ) : (
            <TextInput.Icon icon="eye-off" onPress={toggleShowPassword} />
          )
        }
      />
      <View style={styles.textContainer}>
        <Text
          variant="labelMedium"
          style={styles.text}
          onPress={() => navigation.navigate('Register')}>
          Create an account
        </Text>
      </View>
      <Button
        mode="contained"
        buttonColor="#FFC93C"
        style={styles.button}
        onPress={handleLogin}>
        Login{' '}
      </Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0081C9',
    padding: 20,
  },
  input: {
    marginVertical: 10,
    borderRadius: 6,
  },
  textContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    marginVertical: 15,
  },
  text: {
    color: '#86E5FF',
    textDecorationLine: 'underline',
  },
});
