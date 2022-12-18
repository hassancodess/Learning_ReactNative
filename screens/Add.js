import {StyleSheet, Text, View, Image, ToastAndroid} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'Users.db'});

const Add = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [filePath, setFilePath] = useState({});

  useEffect(() => {
    CREATE_TABLE();
    // DROP_TABLE();
  }, []);

  const handleAddUser = () => {
    if (name && email && filePath) {
      ADD_USER();
      setName('');
      setEmail('');
      setFilePath({});
    } else {
      ToastAndroid.show('Fill up the fields first', ToastAndroid.LONG);
    }
  };
  const CREATE_TABLE = () => {
    let query =
      'CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,email TEXT NOT NULL,imageUri TEXT)';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (tx, res) => {
          console.log('Users Table Created Successfully');
        },
        error => {
          console.log('ERROR while creating Table');
        },
      );
    });
  };
  const ADD_USER = () => {
    let query = 'INSERT INTO Users(name, email, imageUri) VALUES(?,?,?)';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [name, email, filePath.uri],
        (tx, res) => {
          ToastAndroid.show('User Added', ToastAndroid.LONG);
        },
        error => {
          console.log('ERROR while Adding User');
        },
      );
    });
  };

  const DROP_TABLE = () => {
    let query = 'DROP TABLE IF EXISTS Users';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (tx, res) => {
          console.log('Users Table Dropped Successfully');
        },
        error => {
          console.log('ERROR while dropping table');
        },
      );
    });
  };
  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response.assets[0]);
    });
  };
  return (
    <View style={styles.root}>
      <TextInput
        label="Enter name"
        style={styles.nameInput}
        value={name}
        onChangeText={newValue => setName(newValue)}
      />
      <TextInput
        label="Enter email"
        style={styles.emailInput}
        value={email}
        onChangeText={newValue => setEmail(newValue)}
      />
      <View style={styles.imageContainer}>
        <Text>Image</Text>
        <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
      </View>

      <Button
        mode="contained"
        onPress={() => chooseFile('photo')}
        style={styles.button}>
        Choose Photo
      </Button>
      <Button mode="contained" onPress={handleAddUser} style={styles.button}>
        Add User
      </Button>
      {/* For Debugging Purpose */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('List', {name: '2s'})}
        style={styles.button}>
        Refresh
      </Button>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  imageContainer: {
    marginVertical: 20,
  },
  imageStyle: {
    width: '100%',
    height: 200,
    margin: 5,
    borderColor: '#472183',
    borderRadius: 10,
    borderWidth: 2,
  },
  button: {
    marginVertical: 5,
  },
  nameInput: {
    marginVertical: 5,
  },
  emailInput: {
    marginVertical: 5,
  },
});
