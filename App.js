import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import Add from './Add';
import Search from './Search';
import Update from './Update';
import Delete from './Delete';
import Home from './Home';
const Stack = createStackNavigator();
export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Update" component={Update} />
        <Stack.Screen name="Delete" component={Delete} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
