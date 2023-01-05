import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, ToastAndroid} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';

const ProductsList = ({navigation}) => {
  // IPv4(add yours)
  const IP = '';

  // States START
  const [products, setProducts] = useState([]);
  // States END
  //   useEffect START
  useEffect(() => {
    fetchData();
  }, []);
  //   useEffect END
  //   Helper Functions START
  const fetchData = async () => {
    const response = await fetch(
      `http://${IP}/ProductsAPI/api/products/getallproducts`,
    );
    const data = await response.json();
    setProducts(data);
  };
  //   Helper Functions END
  //   showItem START
  const showItem = ({item}) => {
    // Function to navigate to Details Screen
    const navigateDetailsScreen = () => {
      navigation.navigate('ProductDetails', {
        item,
      });
    };
    // Function to Delete Product using API
    const handleDelete = async id => {
      let values = new FormData();
      values.append('id', id);
      const response = await fetch(
        `http://${IP}/ProductsAPI/api/products/deleteproduct`,
        {
          method: 'POST',
          body: values,
        },
      );
      const data = await response.json();
      ToastAndroid.show(data, ToastAndroid.SHORT);
      fetchData();
    };
    return (
      <Card style={styles.cardContainer}>
        <Card.Content>
          <Text variant="titleLarge">{item.title}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={navigateDetailsScreen}>Details</Button>
          <Button onPress={() => handleDelete(item.id)}>Delete</Button>
        </Card.Actions>
      </Card>
    );
  };
  //   showItem END
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={showItem}
      />
    </View>
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  cardContainer: {
    marginVertical: 10,
  },
});
