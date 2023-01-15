import React from 'react';
// Navigation
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
// Screens
import AddFlower from '../screens/Dashboard/AddFlower';
import FlowersList from '../screens/Dashboard/FlowersList';
// Stack Navigation
const Tab = createMaterialBottomTabNavigator();

const DashboardNavigation = ({route}) => {
  const {userID} = route.params;
  return (
    <Tab.Navigator
      initialRouteName="AddFlower"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if (route.name === 'AddFlower') {
            iconName = focused ? 'add' : 'add-outline';
          } else if (route.name === 'FlowersList') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}>
      <Tab.Screen
        name="AddFlower"
        component={AddFlower}
        initialParams={{userID: userID}}
      />
      <Tab.Screen
        name="FlowersList"
        component={FlowersList}
        initialParams={{userID: userID}}
      />
    </Tab.Navigator>
  );
};

export default DashboardNavigation;
