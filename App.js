import {StyleSheet, Text, View} from 'react-native';
import {TextInput, RadioButton} from 'react-native-paper';
import React, {useState} from 'react';

const App = () => {
  const [salary, setSalary] = useState('');
  const [gender, setGender] = useState('');
  const [tax, setTax] = useState('');
  const [amountAfterTax, setAmountAfterTax] = useState('');

  return (
    <View style={styles.root}>
      <View style={styles.salaryContainer}>
        <TextInput />
        <Text>App</Text>
      </View>
      <View style={styles.salaryContainer}>
        <Text>Gender</Text>
        <RadioButton.Group
          onValueChange={newValue => setGender(newValue)}
          value={gender}>
          <RadioButton.Item label="Male" value="Male" />
          <RadioButton.Item label="Female" value="Female" />
        </RadioButton.Group>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
