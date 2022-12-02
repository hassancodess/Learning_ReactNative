import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import {TextInput, RadioButton, Button} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

import React, {useState, useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'PizzaDatabase.db'});

const TakeOrder = () => {
  const [selectedFlavour, setSelectedFlavour] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [flavours, setFlavours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState();
  const [orders, setOrders] = useState([]);
  const [currentOrderPrice, setCurrentOrderPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // console.log('FETCH DISTINCT FLAVOUR useEffect');
    FETCH_DISTINCT_FLAVOURS();
  }, []);

  useEffect(() => {
    // console.log('FETCH DISTINCT SIZES useEffect');
    FETCH_DISTINCT_SIZES();
  }, [selectedFlavour]);

  // useEffect(() => {
  //   // console.log('CURRENT', currentOrderPrice);
  //   let orderTotal = currentOrderPrice * parseInt(quantity);
  //   console.log('ORDER TOTAL: ', orderTotal);
  //   setTotalPrice(prev => prev + orderTotal);
  //   // let total = orders.reduce((acc, obj) => {
  //   //   return acc + parseInt(obj.price);
  //   // }, 0);

  //   // setTotalPrice(total);
  // }, [orders]);

  // useEffect(() => {
  //   console.log('TYPE OF TOTAL PRICE', typeof totalPrice);
  //   console.log('TOTAL PRICE', totalPrice);
  // }, [totalPrice]);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  useEffect(() => {
    let totalCurrentOrder = currentOrderPrice * quantity;
    if (totalCurrentOrder) {
      setTotalPrice(prev => prev + totalCurrentOrder);
    }
    setQuantity(0);
  }, [currentOrderPrice]);

  useEffect(() => {
    console.log('USEEFFECT TOTAL PRICE: ', totalPrice);
  }, [totalPrice]);

  const handleAddOrder = () => {
    FETCH_PIZZA_PRICE();
    const order = {
      flavour: selectedFlavour,
      size: selectedSize,
      quantity,
    };
    setOrders(prev => [...prev, order]);
    // setQuantity(0);
  };

  const FETCH_PIZZA_PRICE = () => {
    let query = 'SELECT price FROM Pizza WHERE flavour = ? AND size = ?';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [selectedFlavour, selectedSize],
        (tx, res) => {
          let record = res.rows.item(0).price;
          setCurrentOrderPrice(record);
        },
        error => {
          console.log('DISTINCT FLAVOURS ERROR');
        },
      );
    });
  };

  const FETCH_DISTINCT_FLAVOURS = () => {
    let query = 'SELECT DISTINCT flavour FROM Pizza ORDER BY flavour';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (tx, res) => {
          let resultsSet = [];
          for (let i = 0; i < res.rows.length; ++i) {
            let record = res.rows.item(i);
            resultsSet.push(record.flavour);
          }
          setFlavours(resultsSet);
          setSelectedFlavour(resultsSet[0]);
        },
        error => {
          console.log('DISTINCT FLAVOURS ERROR');
        },
      );
    });
  };
  const FETCH_DISTINCT_SIZES = () => {
    let query = 'SELECT DISTINCT size FROM Pizza WHERE flavour = ?';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [selectedFlavour],
        (tx, res) => {
          let resultsSet = [];
          for (let i = 0; i < res.rows.length; ++i) {
            let record = res.rows.item(i);
            // console.log(record.size);
            resultsSet.push(record.size);
          }
          setSizes(resultsSet);
          setSelectedSize(resultsSet[0]);
        },
        error => {
          console.log('DISTINCT SIZES ERROR');
        },
      );
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Flavour */}
        <View style={styles.flavourContainer}>
          <Text style={styles.text}>Flavour</Text>
          <Picker
            style={styles.flavourPicker}
            selectedValue={selectedFlavour}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedFlavour(itemValue)
            }>
            {flavours &&
              flavours.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
          </Picker>
        </View>
        {/* Size */}
        <View style={styles.sizeContainer}>
          <Text style={styles.text}>Size</Text>
          <Picker
            style={styles.flavourPicker}
            selectedValue={selectedSize}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedSize(itemValue)
            }>
            {sizes &&
              sizes.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
          </Picker>
        </View>
        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.text}>Price: {totalPrice}</Text>
        </View>
        {/* Qty */}
        <View style={styles.quantityContainer}>
          <Text style={styles.text}>Quantity</Text>
          <TextInput
            style={styles.input}
            label="Enter Quantity"
            value={quantity}
            onChangeText={value => setQuantity(value)}
          />
        </View>
        {/* Button */}
        <Button mode="contained" style={styles.button} onPress={handleAddOrder}>
          Add
        </Button>
        {/* Orders FlatList */}
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index}
          renderItem={Item}
        />
      </View>
    </View>
  );
};
const Item = ({item}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Flavour: {item.flavour}</Text>
      <Text style={styles.itemText}>Size: {item.size}</Text>
      <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
    </View>
  );
};

export default TakeOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6E4E5',
  },
  innerContainer: {
    width: '90%',
    overflow: 'hidden',
  },
  flavourContainer: {
    marginVertical: 10,
  },
  sizeContainer: {
    marginVertical: 10,
  },
  quantityContainer: {
    marginVertical: 10,
  },
  flavourPicker: {
    backgroundColor: '#EFF5F5',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 20,
    marginVertical: 10,
  },
  priceContainer: {
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#EFF5F5',
  },
  button: {
    padding: 5,
    marginVertical: 20,
    backgroundColor: '#68B984',
  },
  itemContainer: {
    padding: 10,
    backgroundColor: '#EFF5F5',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
});
