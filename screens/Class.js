import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button} from 'react-native-paper';

const Class = () => {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const response = await fetch(
      'http://192.168.100.80/Attendence%20System%20API/api/class/getclassnames',
    );
    const data = await response.json();
    setClasses(data);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.container} key={item.id}>
        <Button mode="contained">{item.name}</Button>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={classes}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Class;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});
