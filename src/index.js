import React, {useEffect, useState} from 'react';
import {Platform, StatusBar, LogBox, View, Botton, ScrollView, Modal, TouchableOpacity, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './routes/Tabs'
import {Portal, Text, Button, Provider } from 'react-native-paper';
import {StyleSheet} from 'react-native';
import ButtonAdd from './components/ButtonAdd';
import DatabaseHelper from './database/DatabaseHelper'
import Loader from 'react-native-modal-loader';

// ignore specific yellowbox warnings - Require cycle
LogBox.ignoreLogs([]);

function App(){
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    async function DatabaseConnect(){
      await DatabaseHelper();
    }
    DatabaseConnect();
    setIsLoading(false);
  },[])

  return(
    <NavigationContainer>
      <Loader loading = {isLoading} color = 'blue'/>
      <Tabs/>
      <ButtonAdd/>
    </NavigationContainer>
  )
}

export default App;
