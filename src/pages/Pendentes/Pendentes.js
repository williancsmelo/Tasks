import React, {useEffect, useState} from 'react'
import { 
  View,
  ToastAndroid
} from 'react-native'

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
  const [showTarefas, setShowTarefas] = useState(false)
  async function carregaTarefas(){
    const response = await obterTarefas('Pendente')
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
      {showTarefas &&(
        <ListaTarefas
          tarefas = {tarefas}
          carregaTarefas = {carregaTarefas}
        />
      )}
    </View>
  )
}

export default Pendentes;