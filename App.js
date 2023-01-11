import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Screens
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
// Provider
import {AuthContextProvider} from './context/AuthContext';
// Native Stack
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            // headerBackVisible: false,
            headerStyle: {backgroundColor: '#0081C9'},
            headerTintColor: 'white',
            // headerTitleAlign: 'left',
            // header,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
};
export default App;
