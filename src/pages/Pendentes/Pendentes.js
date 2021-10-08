import React, {useEffect, useState} from 'react'
import { obterTarefas } from '../../database/models/baseModel';
import { View, Text, ToastAndroid } from 'react-native'
import Loader from 'react-native-modal-loader';
import {getConnection, getConnectionManager} from 'typeorm/browser'

export function Pendentes(){
  const [isLoading, setIsLoading] = useState(true)
  async function carregaTarefas(){
    const tarefas = await obterTarefas();
    if(tarefas == 'error'){
      ToastAndroid.show('Erro ao acessar o banco de dados', ToastAndroid.LONG)
    }
  }
  useEffect(() => {
    console.log('Conexão com o banco na tela Pendentes: ', getConnectionManager().has('default'))
    //carregaTarefas();
    setIsLoading(false);
  }, [])
  return(
    <View>
      <Loader loading = {isLoading} color = 'blue'/>
      <Text>Hello World</Text>
    </View>
  )
}

export default Pendentes;