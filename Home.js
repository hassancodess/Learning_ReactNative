import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import {Button} from 'react-native-paper';
import React, {useEffect} from 'react';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {Directions} from 'react-native-gesture-handler';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'productDatabase.db'});
export default function Home({navigation}) {
  useEffect(() => {
    createTable();
  }, []);
  const createTable = () => {
    const query =
      'Create Table if not Exists Products(id integer primary key autoincrement,name varchar(20),price integer,company varchar(30),unit varchar(20))';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (sqltxn, res) => {
          console.log('product Table Created Successfully');
        },
        error => {
          ToastAndroid.show(
            'Error during Product Table Creation..',
            ToastAndroid.LONG,
          );
        },
      );
    });
  };

  const onPressAdd = () => {
    navigation.navigate('Add');
  };
  const onPressSearch = () => {
    navigation.navigate('Search');
  };
  const onPressUpdate = () => {
    navigation.navigate('Update');
  };
  const onPressDelete = () => {
    navigation.navigate('Delete');
  };
  return (
    <View style={styles.container}>
      <View style={styles.btnview}>
        <Button mode="contained" onPress={onPressAdd}>
          Add
        </Button>
        <Button mode="contained" onPress={onPressSearch}>
          Search
        </Button>
        <Button mode="contained" onPress={onPressUpdate}>
          Update
        </Button>
        <Button mode="contained" onPress={onPressDelete}>
          Delete
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  btnview: {
    flexWrap: 'wrap',
    paddingBottom: 10,
    justifyContent: 'space-evenly',
    width: '40%',
  },
});
