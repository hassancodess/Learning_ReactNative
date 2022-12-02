import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TakeOrder = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Flavour */}
        <View style={styles.flavour}>
          <Text style={styles.text}>Flavour</Text>
          <TextInput
            style={styles.input}
            value={flavour}
            onChangeText={value => setFlavour(value)}
          />
        </View>
        {/* Size */}
        <View style={styles.size}>
          <RadioButton.Group
            onValueChange={value => setSize(value)}
            value={size}>
            <RadioButton.Item label="S" value="S" />
            <RadioButton.Item label="L" value="L" />
            <RadioButton.Item label="XL" value="XL" />
          </RadioButton.Group>
        </View>
        {/* Price */}
        <View style={styles.price}>
          <Text style={styles.text}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={value => setPrice(value)}
          />
        </View>
        {/* Save Button */}
        <Button mode="contained" style={styles.button} onPress={submitHandler}>
          Save
        </Button>
      </View>
    </View>
  );
};

export default TakeOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '90%',
    overflow: 'hidden',
  },
  flavour: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 20,
  },
  size: {
    width: '40%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 40,
    width: '40%',
    alignSelf: 'center',
    marginBottom: 30,
    padding: 10,
    backgroundColor: '#68B984',
  },
});
