import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserNavigator from './UserNavigator';
import Login from '../screens/Main/Login';
import Register from '../screens/Main/Register';
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        // headerBackVisible: false,
        headerStyle: {backgroundColor: '#0081C9'},
        headerTintColor: 'white',
        // headerTitleAlign: 'left',
        // header,
      }}>
      <Stack.Screen
        name="UserNavigator"
        component={UserNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
