import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';

const ProductDetails = ({route}) => {
  const {item} = route.params;
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">Title: {item.title}</Text>
          <Text variant="bodyMedium">ID: {item.id}</Text>
          <Text variant="bodyLarge">Price: {item.price}</Text>
          <Text variant="bodyLarge">Stock: {item.stock}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
