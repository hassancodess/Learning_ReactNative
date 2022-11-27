import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import {TextInput, RadioButton, Button} from 'react-native-paper';
import React, {useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'ProductDatabase.db'});

const NewProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [company, setCompany] = useState('');
  const [unit, setUnit] = useState('kg');

  const handleAddProduct = () => {
    ADD_PRODUCT();
    clearFields();
  };

  const clearFields = () => {
    setName('');
    setPrice(0);
    setCompany('');
    setUnit('kg');
  };

  const ADD_PRODUCT = () => {
    let query =
      'INSERT INTO Products(name, price, company, unit) VALUES(?,?,?,?)';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [name, price, company, unit],
        (tx, res) => {
          ToastAndroid.show(
            'New Product Added Successfully!',
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Enter Product Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        label="Enter Product Price"
        value={price}
        onChangeText={text => setPrice(text)}
      />
      <TextInput
        style={styles.input}
        label="Enter Product Company"
        value={company}
        onChangeText={text => setCompany(text)}
      />
      <Text style={styles.selectUnitText}>Select Unit</Text>
      <RadioButton.Group
        onValueChange={newValue => setUnit(newValue)}
        value={unit}>
        <View style={styles.radioButtonGroup}>
          <View style={styles.radioButton}>
            <RadioButton value="kg" />
            <Text>KG</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton value="ltr" />
            <Text>LTR</Text>
          </View>
        </View>
      </RadioButton.Group>
      <Button
        style={styles.btn}
        labelStyle={styles.btnText}
        onPress={handleAddProduct}>
        Save
      </Button>
    </View>
  );
};

export default NewProduct;

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
  btn: {
    backgroundColor: '#2192FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
  },
  btnText: {
    color: 'white',
  },
});
