import { Tarefas } from './entities';
import {getConnectionManager, getRepository} from 'typeorm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

import React, { useState } from 'react';

async function DatabaseHelper(){
  try{
    const connectionManager = getConnectionManager();
    if(connectionManager.has('default')) return connectionManager.get();
    const conexao = connectionManager.create({
      type: 'react-native',
      database: 'tasksdb',
      location: 'default',
      logging: __DEV__ ? 'all' : ['error'],
      synchronize: false,
      entities:[
        Tarefas
      ]
    })
    await conexao.connect();
    const synchronized = AsyncStorage.getItem('@synchronized')
    if(synchronized != 'done')
    {
      await conexao.synchronize();
      await AsyncStorage.setItem('@synchronized', 'done');
    }
    return conexao;
  }
  catch(e){
    console.error(e);
    ToastAndroid.show('Erro ao se conectar com o banco de dados!', ToastAndroid.LONG)
  }
}

export default DatabaseHelper;
