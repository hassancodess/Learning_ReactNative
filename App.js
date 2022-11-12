import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  StatusBar,
} from 'react-native';
import React from 'react';
import Input from './components/Input';
import WishList from './components/WishList';

const App = () => {
  return (
    <View style={styles.container}>
      <Input />
      <WishList />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFF5E7',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,
  },
});
