// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {LoginScreen} from '../screens/LoginScreen';
import {RemitosScreen} from '../screens/RemitosScreen';
import {DetalleRemito} from '../screens/DetalleRemito';
import {CrearRemitoScreen} from '../screens/CrearRemitoScreen'; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function RemitosStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Remitos" component={RemitosScreen} />
      <Stack.Screen name="DetalleRemito" component={DetalleRemito} />
    </Stack.Navigator>
  );
}

export const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Remitos" component={RemitosStackNavigator} />
      <Tab.Screen name="Crear Remito" component={CrearRemitoScreen} />
      {/* Puedes agregar más pestañas aquí */}
    </Tab.Navigator>
  );
};
