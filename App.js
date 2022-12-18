import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Add from './screens/Add';
import List from './screens/List';

const Tab = createMaterialTopTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Add" screenOptions={{lazy: true}}>
        <Tab.Screen name="Add" component={Add} options={{title: 'Add User'}} />
        <Tab.Screen
          name="List"
          component={List}
          options={{title: 'Show Users'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
