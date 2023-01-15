import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import ImagePicker from '../../components/ImagePicker';
const AddFlower = () => {
  const [name, setName] = useState();
  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.headlingText}>
        Add Flower
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={name}
          placeholder="Enter Flower Name"
          onChangeText={text => setName(text)}
        />
        <Text style={styles.text}>Flower Image</Text>
      </View>
      <ImagePicker />
      <Button mode="contained" style={styles.button}>
        Save Flower
      </Button>
      <Text>{name}</Text>
    </View>
  );
};

export default AddFlower;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 18,
  },
  headlingText: {
    textAlign: 'center',
    marginBottom: 20,
    // textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#6B4FAB',
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    marginVertical: 10,
  },
  textContainer: {
    flexDirection: 'row-reverse',
    marginBottom: 20,
  },
  text: {
    color: 'gray',
    fontSize: 14,
    marginTop: 15,
  },
});
