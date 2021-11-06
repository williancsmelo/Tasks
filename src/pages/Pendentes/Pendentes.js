import React, { useEffect, useState } from 'react'
import { 
  View,
  ToastAndroid,
  TouchableOpacity
} from 'react-native'
import { useSelector } from 'react-redux';
import { connect } from 'react-redux'

import { colors } from '../../styles/colors';

import { EventRegister } from 'react-native-event-listeners'

import { obterTarefas } from '../../database/Models';
import ListaTarefas from '../../components/ListaTarefas';

function Pendentes(){
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
    const response = await obterTarefas('Pendente')
    setTarefas(response)
    if(response == 'error'){
      ToastAndroid.show('Erro ao acessar o banco de dados', ToastAndroid.LONG)
    }
  }
  useEffect(() => {
    EventRegister.addEventListener(
      'atualizarTarefas', 
      () => carregaTarefas()
    )
  }, [])
  function setColor(){

  }
  return(
    <View>
      <ListaTarefas
        tarefas = {tarefas}
      />
    </View>
  )
}

export default Pendentes;