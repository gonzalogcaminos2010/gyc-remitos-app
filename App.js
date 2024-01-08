// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RemitosScreen from './screens/RemitosScreen';
import DetalleRemito from './screens/DetalleRemito';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Remitos" component={RemitosScreen} />
        <Stack.Screen name="DetalleRemito" component={DetalleRemito} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
