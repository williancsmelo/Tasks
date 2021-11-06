import React, {useEffect} from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './routes/Tabs'
import ButtonAdd from './components/ButtonAdd';
import DatabaseHelper from './database/DatabaseHelper'
import { EventRegister } from 'react-native-event-listeners'
import { Provider } from 'react-redux'
import store from './store/store'

// ignore specific yellowbox warnings - Require cycle
LogBox.ignoreLogs([]);

class App extends React.Component {
  async componentDidMount() {
    await DatabaseHelper.getInstance();
    EventRegister.emit('atualizarTarefas')
  }

  render() {
    return (
      <Provider store = {store}>
        <NavigationContainer>
          <Tabs />
          <ButtonAdd/>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
