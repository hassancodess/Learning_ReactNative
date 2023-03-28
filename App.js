import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FTP from 'react-native-ftp';
import {Button} from 'react-native-paper';

const connectFTP = () => {
  FTP.setup('localhost', 21); //Setup host
  FTP.login('abc', '123').then(
    result => {
      FTP.list('.').then(result => {
        console.log(result);
      });
    },
    error => {
      alert(error);
    },
  );
};

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Text>App</Text> */}
      <Button onPress={connectFTP}>Connect to FTP</Button>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
