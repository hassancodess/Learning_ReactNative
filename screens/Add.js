import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'ProductDatabase.db'});

const Add = ({navigation}) => {
  const [name, setName] = useState('');

  const [filePath, setFilePath] = useState({});
  useEffect(() => {
    CREATE_TABLE();
  }, []);

  const handleAddUser = () => {
    ADD_USER();
    setName('');
    setFilePath({});
    // console.log(name, filePath.uri);
  };
  // const handleShowUser = () => {
  //   FETCH_USERS();
  // };
  const CREATE_TABLE = () => {
    let query =
      'CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, imageUri TEXT)';
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
  const ADD_USER = () => {
    let query = 'INSERT INTO Users(name, imageUri) VALUES(?,?)';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [name, filePath.uri],
        (tx, res) => {
          console.log('User Added');
        },
        error => {
          console.log('ERROR');
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
      console.log('Response = ', response);
      console.log('Response Assets = ', response.assets[0].uri);

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
      console.log('Response again.. = ', response);
      //   console.log('base64 -> ', response.assets[0].base64);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);
      setFilePath(response.assets[0]);
    });
  };
  return (
    <View>
      <View>
        <TextInput
          label="Enter name"
          value={name}
          onChangeText={newValue => setName(newValue)}
        />
      </View>
      <Text>Uri Image</Text>
      <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
      <Button mode="contained" onPress={() => chooseFile('photo')}>
        Choose Photo
      </Button>
      <Button mode="contained" onPress={handleAddUser}>
        Add User
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('List')}>
        Move to List
      </Button>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
    borderWidth: 5,
    borderColor: 'red',
  },
});
