import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {RadioButton, Text, Button} from 'react-native-paper';

const Question = ({question, submitSkipQuestion, submitUserAnswer}) => {
  const [value, setValue] = React.useState(1);

  const handleSkipQuestion = () => {
    submitSkipQuestion();
  };

  const handleUserAnswer = () => {
    submitUserAnswer(value);
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.questionText}>{question.title}</Text>
      <RadioButton.Group
        onValueChange={newValue => setValue(newValue)}
        value={value}>
        <View style={styles.option}>
          <RadioButton value={1} uncheckedColor="#B3FFAE" color="#B3FFAE" />
          <Text style={styles.optionText}>{question.options[0]}</Text>
        </View>
        <View style={styles.option}>
          <RadioButton value={2} uncheckedColor="#B3FFAE" color="#B3FFAE" />
          <Text style={styles.optionText}>{question.options[1]}</Text>
        </View>
        <View style={styles.option}>
          <RadioButton value={3} uncheckedColor="#B3FFAE" color="#B3FFAE" />
          <Text style={styles.optionText}>{question.options[2]}</Text>
        </View>
      </RadioButton.Group>
      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          buttonColor="#395144"
          onPress={handleSkipQuestion}>
          Skip Question
        </Button>
        <Button
          mode="contained"
          buttonColor="#395144"
          onPress={handleUserAnswer}>
          Next Question
        </Button>
      </View>
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FF6464',
    alignSelf: 'stretch',
    borderRadius: 24,
    overflow: 'hidden',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  questionText: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    letterSpacing: 2,
  },
  option: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: 'white',
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
