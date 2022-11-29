import {View, Text, ToastAndroid, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'productDatabase.db'});
export default function Update() {
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log('Products', products);
  }, [products]);

  const onPressHandler = () => {
    handleUpdate();
    setPrice(0);
  };
  const handleUpdate = () => {
    const query = 'Update Products set price=? where name=?';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [price, selectedItem],
        (sqltxn, res) => {
          ToastAndroid.show('Product Price Updated', ToastAndroid.SHORT);
          fetchProducts();
        },
        error => {
          console.log('ERROR');
        },
      );
    });
  };

  const fetchProducts = () => {
    const query = 'Select * from Products';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (sqltxn, res) => {
          console.log('FETCH');
          let result = [];
          let len = res.rows.length;
          for (let i = 0; i < len; ++i) {
            let record = res.rows.item(i);
            result.push(record);
          }
          setProducts(result);
          setSelectedItem(result[0].name);
        },
        error => {
          console.log('ERROR');
        },
      );
    });
  };
  return (
    <View>
      <View>
        <Picker
          selectedValue={selectedItem}
          onValueChange={value => {
            setSelectedItem(value);
          }}>
          {products &&
            products.map((item, index) => {
              return (
                <Picker.Item label={item.name} value={item.name} key={index} />
              );
            })}
        </Picker>
      </View>
      <TextInput
        placeholder="Enter Updated Price"
        onChangeText={value => {
          setPrice(value);
        }}
      />
      <Button mode="contained" onPress={handleUpdate} />
    </View>
  );
}
