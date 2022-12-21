import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Add from './screens/Add';
import List from './screens/List';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Add">
        <Stack.Screen
          name="Add"
          component={Add}
          options={{title: 'Add User'}}
        />
        <Stack.Screen
          name="List"
          component={List}
          options={{title: 'Show Users'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
