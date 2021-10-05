import React from 'react';
import Pendentes from '../pages/Pendentes/Pendentes'
import Completas from '../pages/Completas/Completas'
import Todas from '../pages/Todas/Todas'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Pendentes" 
        component={Pendentes}
        options={{ tabBarLabel: 'Pendentes' }}
      />

      <Tab.Screen 
        name="Completas" 
        component={Completas}
        options={{ tabBarLabel: 'Concluídas' }}
      />

      <Tab.Screen 
        name="Todas" 
        component={Todas}
        options={{ tabBarLabel: 'Todas' }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;