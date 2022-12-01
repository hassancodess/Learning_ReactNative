import {
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  View,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const App = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = items.reduce((acc, obj) => {
      return acc + parseInt(obj.price);
    }, 0);
    setTotalPrice(total);
  }, [items]);

  const handleSubmit = () => {
    console.log(name, price);
    setItems(prev => [...prev, {name: name, price: price}]);
  };
  return (
    <View>
      <TextInput
        value={name}
        onChangeText={newValue => setName(newValue)}
        placeholder="Expense Name"
        style={styles.input}
      />
      <TextInput
        value={price}
        onChangeText={newValue => setPrice(newValue)}
        placeholder="Enter Price"
        style={styles.input}
      />
      <Button title="Add" onPress={handleSubmit} />
      <FlatList
        data={items}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <View>
            <Text>
              {item.name} ---- {item.price}
            </Text>
          </View>
        )}
      />
      <Text>Total: {totalPrice}</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  input: {
    margin: 10,
    backgroundColor: '#FCF9BE',
    borderRadius: 10,
  },
});
