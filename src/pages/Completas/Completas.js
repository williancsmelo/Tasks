import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import { EventRegister } from 'react-native-event-listeners'

import { obterTarefas } from '../../database/Models';
import ListaTarefas from '../../components/ListaTarefas';

function Completas(){
  const [showTarefas, setShowTarefas] = useState(false)
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
    setShowTarefas(true)
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
    <View>
      {showTarefas && (
        <ListaTarefas
          tarefas = {tarefas}
          carregaTarefas = {carregaTarefas}
        />
      )}
    </View>
  )
}

export default Completas;