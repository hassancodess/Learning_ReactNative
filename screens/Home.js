import {StyleSheet, Text, View} from 'react-native';
// import {Button} from 'react-native-paper';
import Button from '../components/Button';
import React, {useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'ProductDatabase.db'});

const Home = ({navigation}) => {
  useEffect(() => {
    CREATE_TABLE();
  }, []);

  const CREATE_TABLE = () => {
    let query =
      'CREATE TABLE IF NOT EXISTS Products(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, price INTEGER NOT NULL, company TEXT NOT NULL, unit TEXT NOT NULL)';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (tx, res) => {
          console.log('Products Table Created Successfully');
        },
        error => {
          console.log('ERROR');
        },
      );
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button
          title="New Product"
          onPress={() => navigation.navigate('NewProduct')}
        />
        <Button
          title="Search"
          onPress={() => navigation.navigate('SearchProduct')}
        />
        <Button
          title="Update"
          onPress={() => navigation.navigate('UpdateProduct')}
        />
        <Button
          title="Delete"
          onPress={() => navigation.navigate('DeleteProduct')}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
