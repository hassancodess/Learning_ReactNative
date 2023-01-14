import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useIsFocused, useNavigation} from '@react-navigation/native';
// Context
import AuthContext from '../../context/AuthContext';

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(true);
  // Context
  const {createAccount} = useContext(AuthContext);
  // Navigation
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Toggle Secure Text Entry
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // Calls createAccout method from AuthContext
  const handleCreateAccount = async () => {
    const res = await createAccount(name, email, age, password);
    if (res) {
      navigation.navigate('Login');
      ToastAndroid.show('Account Created Successfully', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Couldn't Create Account", ToastAndroid.SHORT);
    }
  };
  //   // Clear State when in Focus - CASE: if users presses back button
  useEffect(() => {
    if (isFocused) {
      setEmail('');
      setPassword('');
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
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
        label="Age"
        style={styles.input}
        value={age}
        onChangeText={text => setAge(text)}
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
      {/* <TextInput
        label="Confirm Password"
        style={styles.input}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry={showConfirmPassword ? true : false}
        right={
          showConfirmPassword ? (
            <TextInput.Icon icon="eye" onPress={toggleShowConfirmPassword} />
          ) : (
            <TextInput.Icon
              icon="eye-off"
              onPress={toggleShowConfirmPassword}
            />
          )
        }
      /> */}
      <View style={styles.textContainer}>
        <Text
          variant="labelMedium"
          style={styles.text}
          onPress={() => navigation.navigate('Login')}>
          Already have an account? Login
        </Text>
      </View>
      <Button
        mode="contained"
        buttonColor="#FFC93C"
        style={styles.button}
        onPress={handleCreateAccount}>
        SignUp{' '}
      </Button>

      <Text>{name}</Text>
      <Text>{email}</Text>
      <Text>{password}</Text>
      <Text>{age}</Text>
    </View>
  );
};

export default Register;

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
