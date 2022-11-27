import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import NewProduct from './screens/NewProduct';
import SearchProduct from './screens/SearchProduct';
import UpdateProduct from './screens/UpdateProduct';
import DeleteProduct from './screens/DeleteProduct';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'New Product',
            headerStyle: {
              backgroundColor: '#2192FF',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="NewProduct"
          component={NewProduct}
          options={{
            title: 'New Product',
            headerStyle: {
              backgroundColor: '#2192FF',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="SearchProduct"
          component={SearchProduct}
          options={{
            title: 'Search Product',
            headerStyle: {
              backgroundColor: '#2192FF',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="UpdateProduct"
          component={UpdateProduct}
          options={{
            title: 'Update Product',
            headerStyle: {
              backgroundColor: '#2192FF',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="DeleteProduct"
          component={DeleteProduct}
          options={{
            title: 'Delete Product',
            headerStyle: {
              backgroundColor: '#2192FF',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
