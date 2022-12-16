import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'ProductDatabase.db'});

const List = () => {
  const [users, setUsers] = useState('');
  useEffect(() => {
    FETCH_USERS();
  }, []);
  const FETCH_USERS = () => {
    let query = `SELECT * FROM Users`;
    db.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (tx, res) => {
          let resultsSet = [];
          for (let i = 0; i < res.rows.length; ++i) {
            let record = res.rows.item(i);
            resultsSet.push(record);
          }
          setUsers(resultsSet);
        },
        error => {
          console.log('ERROR');
        },
      );
    });
  };
  return (
    <FlatList
      data={users}
      keyExtractor={(item, index) => index}
      renderItem={({item}) => {
        console.log(item.name);
        return (
          <View style={{margin: 20, backgroundColor: 'red'}}>
            <Text style={{fontSize: 24}}>{item.name}</Text>
            <Image source={{uri: item.imageUri}} style={styles.imageStyle} />
          </View>
        );
      }}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  imageStyle: {
    width: 100,
    height: 200,
  },
});
