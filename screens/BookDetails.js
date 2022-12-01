import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BookDetails = ({route}) => {
  const {item} = route.params;
  const obj = route.params;
  obj.item.title;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.detailsText}>Pages: {item.pages}</Text>
      <Text style={styles.detailsText}>Author: {item.author}</Text>
      <Text style={styles.detailsText}>Publisher: {item.publisher}</Text>
      <Text style={styles.detailsText}>Price: {item.price}</Text>
    </View>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
});
