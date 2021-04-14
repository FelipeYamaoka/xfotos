import React, { useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import TelaInicial from '../pages/TelaInicial';
import Camera from '../pages/Camera';
import Mapa from '../pages/Mapa'

function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="TelaInicial" component={TelaInicial} />
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="Mapa" component={Mapa} />
    </Stack.Navigator>
  );
}

export default Routes;
