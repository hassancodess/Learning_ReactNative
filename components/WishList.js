import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Wish from './Wish';

const WishList = () => {
  const DATA = [
    {id: 1, text: 'Learn React'},
    {id: 2, text: 'Learn React Native'},
    {id: 3, text: 'Learn Angular'},
    {id: 4, text: 'Learn Vue'},
    {id: 5, text: 'Learn Next'},
    {id: 6, text: 'Learn Tailwind'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Wishlist</Text>
      <FlatList data={DATA} keyExtractor={item => item.id} renderItem={Wish} />
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#393E46',
  },
});
