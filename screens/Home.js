import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ToastAndroid,
} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import Data from '../Data';

const Home = ({route, navigation}) => {
  const params = route.params;
  const isFocused = useIsFocused();
  const [items, setItems] = useState(Data);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    console.log('Home useEffect');
    if (isFocused) {
      if (params) {
        setCartItems(params.cartItems);
      }
    }
  }, [isFocused]);

  // SYNC with Cart Route
  const handleAddToCart = item => {
    setCartItems(prev => [...prev, item]);
    ToastAndroid.show('Added to Cart', ToastAndroid.SHORT);
  };

  const handleViewCart = () => {
    navigation.navigate('Cart', {cartItems});
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
          <Button mode="contained" onPress={() => handleAddToCart(item)}>
            Add to Cart
          </Button>
        </Card.Actions>
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={handleViewCart}>
        View Cart
      </Button>
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-around'}}
        numColumns={2}
        data={items}
        keyExtractor={(item, index) => index}
        renderItem={showItem}
      />
    </View>
  );
};

export default Home;

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
});
