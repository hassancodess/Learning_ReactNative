import React, {useEffect, useContext, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AuthContext from '../../context/AuthContext';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Avatar, Button, Card, Text} from 'react-native-paper';

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

  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
  return (
    <View style={styles.container}>
      {userInfo && (
        <>
          <Card>
            <Card.Title
              title={userInfo.email}
              subtitle={`ID: ${userInfo.id}`}
              left={LeftContent}
            />
            <Card.Content>
              <Text variant="titleLarge">{userInfo.name}</Text>
              <Text variant="bodyMedium">{userInfo.password}</Text>
            </Card.Content>
            <Card.Cover source={{uri: 'https://picsum.photos/1000'}} />
          </Card>
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
