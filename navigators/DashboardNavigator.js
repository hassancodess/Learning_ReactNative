import React from 'react';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// Screens
import AddFlower from '../screens/Dashboard/AddFlower';
import FlowersList from '../screens/Dashboard/FlowersList';
// Stack Navigation
const Tab = createMaterialBottomTabNavigator();

const DashboardNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="AddFlower">
      <Tab.Screen name="AddFlower" component={AddFlower} />
      <Tab.Screen name="FlowersList" component={FlowersList} />
    </Tab.Navigator>
  );
};

export default DashboardNavigation;
