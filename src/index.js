import React from 'react';
import {Platform, StatusBar, LogBox, View, Botton, ScrollView, Modal, TouchableOpacity, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './routes/Tabs'
import {Portal, Text, Button, Provider } from 'react-native-paper';
import {StyleSheet} from 'react-native';
import ButtonAdd from './components/ButtonAdd';

// ignore specific yellowbox warnings - Require cycle
LogBox.ignoreLogs([]);

function App(){
  return(
    <NavigationContainer>
      <Tabs/>
      <ButtonAdd/>
    </NavigationContainer>
  )
}

export default App;
