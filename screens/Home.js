import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import React, {useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'PizzaDatabase.db'});

const Home = ({navigation}) => {
  useEffect(() => {
    CREATE_TABLE();
  }, []);

  const CREATE_TABLE = () => {
    let query =
      'CREATE TABLE IF NOT EXISTS Pizza(id INTEGER PRIMARY KEY AUTOINCREMENT, flavour TEXT NOT NULL, price INTEGER NOT NULL, size TEXT NOT NULL)';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (tx, res) => {
          console.log('Pizza Table Created Successfully');
        },
        error => {
          console.log('ERROR');
        },
      );
    });
  };

  const onPressHandler = name => {
    navigation.navigate(name);
  };
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => onPressHandler('NewPizza')}>
        New Pizza
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => onPressHandler('TakeOrder')}>
        Take Order
      </Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D5656',
    justifyContent: 'center',
  },
  button: {
    width: '40%',
    alignSelf: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#68B984',
  },
});
