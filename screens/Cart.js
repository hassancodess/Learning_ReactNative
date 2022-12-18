import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ToastAndroid,
} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';

const Cart = ({route, navigation}) => {
  const params = route.params;

  const [cartItems, setCartItems] = useState(params.cartItems);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(() => {
      const newTotal = cartItems.reduce((acc, curr) => acc + curr.price, 0);
      console.log('New Total', newTotal);
      setTotal(newTotal);
    });
  }, [cartItems]);
  // console.log(params);

  const handleDeleteItem = id => {
    setCartItems(() => {
      const filteredItems = cartItems.filter((item, index) => item.id !== id);
      console.log(filteredItems);
      return filteredItems;
    });
  };

  const handleViewHome = () => {
    navigation.navigate('Home', {cartItems});
  };

  const showItem = ({item}) => {
    return (
      <Card style={styles.cardContainer}>
        <Card.Title title={item.title} />
        <Card.Content style={styles.cardContent}>
          <Paragraph>{item.price}</Paragraph>
        </Card.Content>
        {/* <Card.Cover source={{uri: item.image}} /> */}
        <Card.Cover source={item.image} />
        {/* <Card.Cover source={item.image} /> */}
        <Card.Actions style={styles.cardActions}>
          <Button mode="contained" onPress={() => handleDeleteItem(item.id)}>
            Delete Item
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={handleViewHome}>
        Go to Home
      </Button>
      <Text style={styles.totalText}>Total: {total}</Text>
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-around'}}
        numColumns={2}
        data={cartItems}
        keyExtractor={(item, index) => index}
        renderItem={showItem}
      />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  cardContainer: {
    padding: 10,
    marginVertical: 10,
  },
  cardContent: {
    marginBottom: 10,
  },
  cardActions: {
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
