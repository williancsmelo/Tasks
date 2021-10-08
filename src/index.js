import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './routes/Tabs'
import ButtonAdd from './components/ButtonAdd';
import DatabaseHelper from './database/DatabaseHelper'

// ignore specific yellowbox warnings - Require cycle
LogBox.ignoreLogs([]);

class App extends React.Component {
  async componentDidMount() {
    await DatabaseHelper.getInstance();
  }

  render() {
    return (
      <NavigationContainer>
        <Tabs />
        <ButtonAdd/>
      </NavigationContainer>
    );
  }
}

export default App;
