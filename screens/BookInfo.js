import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React from 'react';
// import {books} from '../data/data';

const BookInfo = ({navigation}) => {
  const books = [
    {
      title: 'C#',
      pages: 200,
      author: 'Robert',
      publisher: 'XYZ',
      price: 1000,
    },
    {
      title: 'Java',
      pages: 200,
      author: 'Robert',
      publisher: 'XYZ',
      price: 1000,
    },
    {
      title: 'JavaScript',
      pages: 200,
      author: 'Robert',
      publisher: 'XYZ',
      price: 1000,
    },
    {
      title: 'Python',
      pages: 200,
      author: 'Robert',
      publisher: 'XYZ',
      price: 1000,
    },
  ];

  const Item = ({item}) => {
    const onPressHandler = () => {
      navigation.navigate('BookDetails', {
        item,
      });
    };
    return (
      <Pressable style={styles.itemContainer} onPress={onPressHandler}>
        <Text style={styles.itemText}>{item.title}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item, index) => index}
        renderItem={Item}
      />
    </View>
  );
};

export default BookInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    // alignItems: 'center',
  },
  itemContainer: {
    alignSelf: 'center',
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    width: '60%',
  },
  itemText: {
    color: 'white',
  },
});
