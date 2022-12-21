import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Button, Card, Paragraph} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'Users.db'});

const List = () => {
  const [users, setUsers] = useState([]);
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
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index}
        renderItem={showItem}
      />
    </View>
  );
};
const showItem = ({item}) => {
  return (
    <Card style={styles.cardContainer}>
      <Card.Title title={item.name} />
      <Card.Content style={styles.cardContent}>
        <Paragraph>{item.email}</Paragraph>
      </Card.Content>
      <Card.Cover source={{uri: item.imageUri}} />
      <Card.Actions style={styles.cardActions}>
        <Button mode="contained">Delete</Button>
      </Card.Actions>
    </Card>
  );
};
export default List;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  cardContainer: {
    padding: 10,
    marginVertical: 10,
  },
  cardContent: {
    marginBottom: 10,
  },
  cardActions: {
    marginTop: 10,
  },
  imageStyle: {
    width: 100,
    height: 200,
  },
});
