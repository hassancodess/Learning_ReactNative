import {StyleSheet, Text, View, FlatList} from 'react-native';
import {TextInput, RadioButton, Button} from 'react-native-paper';
import ProductsList from '../components/ProductsList';
import React, {useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'ProductDatabase.db'});

const SearchProduct = () => {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('company');
  const [products, setProducts] = useState([]);

  const handleSearchProduct = () => {
    FETCH_PRODUCTS();
  };

  const FETCH_PRODUCTS = () => {
    let query;
    if (unit === 'company') {
      query = `SELECT * FROM Products WHERE company = ? `;
    } else if (unit === 'product') {
      query = `SELECT * FROM Products WHERE name = ? `;
    } else {
      query = `SELECT * FROM Products WHERE price > ? `;
    }
    db.transaction(txn => {
      txn.executeSql(
        query,
        [name],
        (tx, res) => {
          let resultsSet = [];
          for (let i = 0; i < res.rows.length; ++i) {
            let record = res.rows.item(i);
            resultsSet.push(record);
          }
          setProducts(resultsSet);
        },
        error => {
          console.log('ERROR');
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Enter Text"
        value={name}
        onChangeText={text => setName(text)}
      />
      <RadioButton.Group
        onValueChange={newValue => setUnit(newValue)}
        value={unit}>
        <View style={styles.radioButtonGroup}>
          <View style={styles.radioButton}>
            <RadioButton value="company" />
            <Text>Company</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton value="product" />
            <Text>Product</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton value="price" />
            <Text>{'>'} Price</Text>
          </View>
        </View>
      </RadioButton.Group>
      <Button onPress={handleSearchProduct}>Search</Button>
      <ProductsList products={products} />
    </View>
  );
};

export default SearchProduct;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  input: {
    marginVertical: 5,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  radioButtonGroup: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  selectUnitText: {
    fontSize: 16,
  },
});
