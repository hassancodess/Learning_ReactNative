import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'UsersDatabase.db'});

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleLogin = () => {
    FETCH_USER();
    if (user) {
      navigation.navigate('Home', {
        name: user.name,
        email: user.email,
      });
    }
  };
  const FETCH_USER = () => {
    let query = 'SELECT * FROM Users WHERE email = ? AND password = ?';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [email, password],
        (tx, res) => {
          let record = res.rows.item(0);

          setUser(record);
          //   console.log(user);
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
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
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
});
