import { Tarefas } from '../entities/';
import { CreateTasks1633629642656 } from '../migrations/1633629642656-CreateTasks'
import {getConnectionManager, getRepository} from 'typeorm/browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {ToastAndroid} from 'react-native';;
import { text } from 'stream/consumers';

class DatabaseHelper extends React.Component {
  static getInstance = async () => {
    try {
      const connectionManager = getConnectionManager();
      if (connectionManager.has('default')) {
        return connectionManager.get();
      } else {
        const conexao = connectionManager.create({
          type: 'react-native',
          database: 'tasksdb',
          location: 'default',
          logging: __DEV__ ? 'all' : ['error'],
          synchronize: false,
          entities: [
            Tarefas
          ],
        });
        await conexao.connect();
        let dbSync = await AsyncStorage.getItem('@schema_synchronized');
        if (dbSync === null) {
          await conexao.synchronize();
          await AsyncStorage.setItem('@schema_synchronized', 'true');
        }
        return conexao;
      }
    } catch (e) {
      ToastAndroid.show(
        'Ocorreu um erro ao se conectar com o banco de dados!',
        ToastAndroid.LONG,
      );
      console.error(e);
    }
  };
}

export default DatabaseHelper;
