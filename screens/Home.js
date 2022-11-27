import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Home = ({route}) => {
  const {name, email} = route.params;
  return (
    <View>
      <Text>
        Name: {name} - Email: {email}
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
