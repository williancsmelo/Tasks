import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import {colors} from '../../styles/'

import { EventRegister } from 'react-native-event-listeners'

import { obterTarefas } from '../../database/Models';
import ListaTarefas from '../../components/ListaTarefas';

function Completas(){
  const [tarefas, setTarefas] = useState([{
    id:'',
    nome:'',
    prioridade:'',
    descricao:'',
    status:'',
    dataCriacao:'',
    dataConclusao:''
  }])
  async function carregaTarefas(){
    const response = await obterTarefas('Concluído')
    setTarefas(response)
    if(response == 'error'){
      ToastAndroid.show('Erro ao acessar o banco de dados', ToastAndroid.LONG)
    }
  }
  useEffect(() => {
    EventRegister.addEventListener('atualizarTarefas', () => dados())
    async function dados(){
      await carregaTarefas();
    }
  }, [])
  return(
    <View style = {{
      backgroundColor: colors.background,
      height: '100%'
    }}>
        <ListaTarefas
          tarefas = {tarefas}
        />
    </View>
  )
}

export default Completas;