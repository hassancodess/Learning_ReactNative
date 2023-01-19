import {StyleSheet, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {Button, Card, Text} from 'react-native-paper';
import IP from '../../ip';
import {useIsFocused} from '@react-navigation/native';

const FlowersList = () => {
  const [flowers, setFlowers] = useState([]);
  const route = useRoute();
  const isFocused = useIsFocused();
  let userID = route.params.userID;
  console.log('FlowerList UserID', userID);
  useEffect(() => {
    if (userID) {
      fetchFlowers();
      console.log('Fetched');
    }
  }, [isFocused]);
  const fetchFlowers = async () => {
    const response = await fetch(
      `http://${IP}/FlowerAPITask/api/flowers/GetUserFlowers?id=${userID}`,
      {
        method: 'GET',
      },
    );
    const data = await response.json();
    setFlowers(data);
  };
  const showItem = ({item}) => {
    const imageUri = `http://${IP}/FlowerAPITask/images/${item.image}`;
    return (
      <Card style={styles.cardContainer}>
        <Card.Title title={`Flower Name: ${item.name}`} />
        <Card.Cover source={{uri: imageUri}} />
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={flowers}
        keyExtractor={item => item.id}
        renderItem={showItem}
      />
    </View>
  );
};

export default FlowersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 18,
  },
  cardContainer: {
    marginVertical: 20,
  },
});
