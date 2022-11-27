import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'UsersDatabase.db'});

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    CREATE_TABLE();
  }, []);

  const handleRegister = () => {
    console.log(name, email, password);
    ADD_USER();
    setName('');
    setEmail('');
    setPassword('');
    navigation.navigate('Login');
  };

  const ADD_USER = () => {
    let query = 'INSERT INTO Users(name, email, password) VALUES(?,?,?)';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [name, email, password],
        (tx, res) => {
          ToastAndroid.show('User Added Successfully', ToastAndroid.LONG);
          console.log(res);
        },
        error => {
          console.log('ERROR');
        },
      );
    });
  };

  const CREATE_TABLE = () => {
    let query =
      'CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL)';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (tx, res) => {
          console.log('Users Table Created Successfully');
        },
        error => {
          console.log('ERROR');
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Enter Name"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />
      <TextInput
        label="Enter Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Enter Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleRegister}>
        Register
      </Button>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
});
