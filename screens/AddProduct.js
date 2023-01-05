import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

const AddProduct = () => {
  // IPv4(add yours);
  const IP = '';
  // States
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  // Functions
  const handleAddProduct = async () => {
    let formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('stock', stock);
    const response = await fetch(
      `http://${IP}/ProductsAPI/api/products/addproductbymultipartrequest`,
      {
        method: 'POST',
        body: formData,
      },
    );

    const data = await response.json();
    console.log(data);
    setTitle('');
    setPrice('');
    setStock('');
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Title"
        value={title}
        onChangeText={text => setTitle(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Price"
        value={price}
        onChangeText={text => setPrice(text)}
        style={styles.input}
        keyboardType="number-pad"
      />
      <TextInput
        placeholder="Enter Stock"
        value={stock}
        onChangeText={text => setStock(text)}
        style={styles.input}
        keyboardType="number-pad"
      />
      <Button mode="contained" onPress={handleAddProduct} style={styles.button}>
        Add Product
      </Button>
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 10,
  },
});
