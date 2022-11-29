import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {RadioButton} from 'react-native-paper';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'productDatabase.db'});

const Add = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [company, setCompany] = useState('');
  const [unit, setUnit] = useState('kg');

  const onPressHandler = () => {
    AddProduct();
    setName('');
    setPrice(0);
    setCompany('');
    setUnit('kg');
  };
  const AddProduct = () => {
    const query =
      'Insert into Products (name,price,company,unit) Values(?,?,?,?)';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [name, price, company, unit],
        (sqltxn, res) => {
          console.log(res);
          ToastAndroid.show(
            'New product Added successfully',
            ToastAndroid.SHORT,
          );
        },
        error => {
          console.log('ERROR');
        },
      );
    });
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
