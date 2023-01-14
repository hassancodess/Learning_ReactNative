import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// Provider
import {AuthContextProvider} from './context/AuthContext';
// Main Navigator
import MainNavigator from './navigators/MainNavigator';
const App = () => {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
};
export default App;
