import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {RadioButton} from 'react-native-paper';
// import {openDatabase, enablePromise} from 'react-native-sqlite-storage';

// const db = openDatabase({name: 'productDatabase.db'});
// enablePromise(true);
import {
  getDBConnection,
  createTable,
  deleteTable,
  getProducts,
  saveProduct,
  deleteProduct,
} from './db-service';

let db;
const init = async () => {
  db = await getDBConnection();
  await createTable(db);
  const storedProducts = await getProducts(db);
  console.log('products', storedProducts);
  console.log('DB', db);
};

const Add = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [company, setCompany] = useState('');
  const [unit, setUnit] = useState('kg');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const onPressHandler = () => {
    console.log(name, price, company, unit);
    // AddProduct(name, price, company, unit);
    setName('');
    setPrice(0);
    setCompany('');
    setUnit('kg');
    // const res = fetchProducts();
    // console.log('RES', res);
  };

  return (
    <View>
      <TextInput
        value={name}
        style={styles.input}
        onChangeText={value => {
          setName(value);
        }}
        placeholder="Enter Product Name"
      />
      <TextInput
        value={price}
        style={styles.input}
        onChangeText={value => {
          setPrice(value);
        }}
        placeholder="Enter Product Price"
      />
      <TextInput
        value={company}
        style={styles.input}
        onChangeText={value => {
          setCompany(value);
        }}
        placeholder="Enter Product company"
      />
      <Text style={styles.text}> Select Unit</Text>
      <RadioButton.Group
        value={unit}
        onValueChange={value => {
          setUnit(value);
        }}>
        <RadioButton.Item label="KG" value="kg" />
        <RadioButton.Item label="LTR" value="ltr" />
      </RadioButton.Group>
      <Button style={styles.btnStyle} mode="contained" onPress={onPressHandler}>
        Save
      </Button>
    </View>
  );
};
export default Add;
const styles = StyleSheet.create({
  input: {padding: 10},
  text: {fontSize: 25},
  btnStyle: {
    backgroundColor: 'blue',
  },
});
