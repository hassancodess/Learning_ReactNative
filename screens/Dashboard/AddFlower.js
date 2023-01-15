import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ToastAndroid} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import ImagePicker from '../../components/ImagePicker';
import {useRoute} from '@react-navigation/native';

const AddFlower = () => {
  // States
  const [name, setName] = useState();
  const [imageData, setImageData] = useState({});
  const IP = '192.168.100.80';
  // Navigation hooks
  const route = useRoute();
  let userID = route.params.userID;
  console.log('AddFlower UserID', userID);
  // Utility Functions
  const clearStates = () => {
    setName('');
    setImageData({});
  };
  const handleSaveImage = async () => {
    try {
      let data = new FormData();
      data.append('name', name);
      data.append('userID', userID);
      data.append('image', imageData);

      const requestOptions = {
        method: 'POST',
        body: data,
      };
      const response = await fetch(
        `http://${IP}/FlowerAPITask/api/flowers/UploadFlower`,
        requestOptions,
      );
      const results = await response.json();
      ToastAndroid.show(results, ToastAndroid.SHORT);
      clearStates();
    } catch (error) {
      console.log('ERROR REQUEST', error);
    }
  };
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
      <ImagePicker imageData={imageData} setImageData={setImageData} />
      <Button mode="contained" style={styles.button} onPress={handleSaveImage}>
        Save Flower
      </Button>
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
