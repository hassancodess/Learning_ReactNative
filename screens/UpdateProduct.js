import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'ProductDatabase.db'});

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    FETCH_PRODUCTS();
  }, []);

  const handleUpdateProduct = () => {
    UPDATE_PRODUCT();
    setPrice(0);
  };

  const UPDATE_PRODUCT = () => {
    let query = 'UPDATE Products SET price = ? WHERE name = ?';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [price, selectedItem],
        (tx, res) => {
          ToastAndroid.show('Product Price Updated!', ToastAndroid.SHORT);
          FETCH_PRODUCTS();
        },
        error => {
          console.log('ERROR');
        },
      );
    });
  };

  const FETCH_PRODUCTS = () => {
    let query = 'SELECT * FROM Products';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (tx, res) => {
          let resultsSet = [];
          for (let i = 0; i < res.rows.length; ++i) {
            let record = res.rows.item(i);
            resultsSet.push(record);
          }
          setProducts(resultsSet);
          setSelectedItem(resultsSet[0].name);
        },
        error => {
          console.log('ERROR');
        },
      );
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedItem}
          onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}>
          {products &&
            products.map((item, index) => {
              return (
                <Picker.Item label={item.name} value={item.name} key={index} />
              );
            })}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        label="Enter Updated Price"
        value={price}
        keyboardType="numeric"
        onChangeText={text => setPrice(text)}
      />
      <Button
        style={styles.btn}
        labelStyle={styles.btnText}
        onPress={handleUpdateProduct}>
        Update
      </Button>
    </View>
  );
};

export default UpdateProduct;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  input: {
    marginVertical: 5,
  },
  pickerContainer: {
    borderWidth: 4,
    borderColor: '#2192FF',
    marginBottom: 10,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: '#2192FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  btnText: {
    color: 'white',
  },
  input: {
    marginVertical: 10,
  },
});
