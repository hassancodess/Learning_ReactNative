import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'todoSQLite'});

const App = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [users, setUsers] = useState([
    {name: 'Hassan', city: 'RWP', address: 'adda'},
    {name: 'Hassan', city: 'RWP', address: 'adda'},
  ]);
  const [buttonTitle, setButtonTitle] = useState('Add User');

  useEffect(() => {
    CREATE_TABLE();
    FETCH_USERS();
    // DROP_TABLE();
  }, []);

  const DROP_TABLE = () => {
    let query = 'DROP TABLE IF EXISTS Users';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (tx, res) => {
          console.log('Users Table Deleted');
        },
        error => {
          console.log('ERROR');
        },
      );
    });
  };

  const UPDATE_USER = () => {
    let query = 'UPDATE Users SET name=?, city=?, address=? where id=?';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [name, city, address, id],
        (tx, res) => {
          console.log('Users Table UPDATED');
          FETCH_USERS();
        },
        error => {
          console.log('ERROR');
        },
      );
    });
  };

  const CREATE_TABLE = () => {
    let query =
      'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT , city TEXT, address TEXT)';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (tx, res) => {
          console.log('Users Table Created');
        },
        error => {
          console.log('ERROR');
        },
      );
    });
  };

  const ADD_USER = () => {
    let query = 'INSERT INTO Users(name, city, address) VALUES(?,?,?)';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [name, city, address],
        (tx, res) => {
          console.log('USER ADDED', res);
          FETCH_USERS();
        },
        error => {
          console.log('ERROR', error);
        },
      );
    });
  };

  const DELETE_USER = id => {
    let query = 'DELETE FROM Users WHERE id=?';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [id],
        (tx, res) => {
          console.log('USER Deleted', res);
          FETCH_USERS();
        },
        error => {
          console.log('ERROR', error);
        },
      );
    });
  };

  const FETCH_USERS = () => {
    let query = 'SELECT * FROM Users ';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (tx, res) => {
          let resultsSet = [];
          for (let i = 0; i < res.rows.length; i++) {
            let record = res.rows.item(i);
            resultsSet.push({
              id: record.id,
              name: record.name,
              city: record.city,
              address: record.address,
            });
          }
          setUsers(resultsSet);
        },
        error => {
          console.log('ERROR DURING FETCH TODOS', error);
        },
      );
    });
  };

  const handleAddUser = () => {
    let user = {
      name: name,
      city: city,
      address: address,
    };
    ADD_USER();
    console.log('ADDED', user);
  };
  const handleUpdateUser = () => {
    UPDATE_USER();
    setButtonTitle('Add User');
  };
  const handleEditUser = item => {
    setId(parseInt(item.id));
    setName(item.name);
    setCity(item.city);
    setAddress(item.address);
    setButtonTitle('Update User');
  };
  const handleDeleteUser = id => {
    DELETE_USER(id);
    FETCH_USERS();
  };
  const Item = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Text>Name: {item.name}</Text>
        <Text>City: {item.city}</Text>
        <Text>Address: {item.address}</Text>
        <Button onPress={() => handleEditUser(item)} title="Edit"></Button>
        <Button
          onPress={() => handleDeleteUser(item.id)}
          title="Delete"></Button>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* Inputs */}
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={newText => setName(newText)}
          placeholder="Enter Name"
        />
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={newText => setCity(newText)}
          placeholder="Enter City"
        />
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={newText => setAddress(newText)}
          placeholder="Enter Address"
        />
        {buttonTitle === 'Add User' && (
          <Button
            onPress={handleAddUser}
            title={buttonTitle.toString()}></Button>
        )}
        {buttonTitle === 'Update User' && (
          <Button
            onPress={handleUpdateUser}
            title={buttonTitle.toString()}></Button>
        )}
      </View>
      <View style={styles.itemsContainer}>
        {/* Flatlist */}
        <FlatList
          data={users}
          keyExtractor={(item, index) => index}
          renderItem={Item}
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1, margin: 10},
  input: {
    marginBottom: 20,
    borderWidth: 2,
  },
  itemContainer: {
    backgroundColor: 'grey',
    marginVertical: 10,
  },
});
