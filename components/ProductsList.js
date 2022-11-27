import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';

const ProductsList = ({products}) => {
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>ID: {item.id}</Text>
            <Text style={styles.itemText}>Name: {item.name}</Text>
            <Text style={styles.itemText}>Price: {item.price}</Text>
            <Text style={styles.itemText}>Company: {item.company}</Text>
          </View>
        );
      }}
    />
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 14,
    backgroundColor: '#2192FF',
    marginBottom: 10,
    padding: 15,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
