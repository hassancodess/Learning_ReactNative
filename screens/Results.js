import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Results = ({total, correct, skipped, wrong}) => {
  return (
    <View style={styles.resultsContainer}>
      <Text style={styles.resultsHeading}>Results</Text>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Total Questions: {total}</Text>
        <Text style={styles.statsText}>Correct: {correct}</Text>
        <Text style={styles.statsText}>Wrong: {wrong}</Text>
        <Text style={styles.statsText}>Skipped Questions: {skipped}</Text>
      </View>
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  resultsContainer: {
    backgroundColor: '#FF6464',
    alignSelf: 'stretch',
    borderRadius: 24,
    overflow: 'hidden',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  resultsHeading: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#B3FFAE',
  },
  statsText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});
