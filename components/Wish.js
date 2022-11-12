import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Wish = ({item}) => {
  return (
    <View style={styles.wishContainer}>
      <Text style={styles.wishText}>{item.text}</Text>
      <View style={styles.actionsContainer}>
        <Text style={styles.actionButton}>Edit</Text>
        <Text style={styles.actionButton}>Delete</Text>
      </View>
    </View>
  );
};

export default Wish;

const styles = StyleSheet.create({
  wishContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#6C4AB6',
    marginBottom: 10,
    borderRadius: 10,
  },
  wishText: {
    // textAlign: 'center',
    fontSize: 16,
    color: '#CFF5E7',
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 10,
  },
});
