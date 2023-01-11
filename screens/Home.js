import React, {useEffect, useContext, useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AuthContext from '../context/AuthContext';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const Home = () => {
  const {userInfo, isAuth} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuth) {
      navigation.navigate('Login');
    }
    if (isFocused) {
      console.log('isFocused UserInfo:', userInfo);
      console.log('isFocused isAuth:', isAuth);
    }
  }, [isFocused]);

  return (
    <View>
      {userInfo && (
        <>
          <Text>ID: {userInfo.id}</Text>
          <Text>Name: {userInfo.name}</Text>
          <Text>Age: {userInfo.age}</Text>
          <Text>Email: {userInfo.email}</Text>
          <Text>Password: {userInfo.password}</Text>
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
