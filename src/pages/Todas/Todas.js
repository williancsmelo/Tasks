import React, {useEffect, useState} from 'react'
import { View } from 'react-native'

import { EventRegister } from 'react-native-event-listeners'

import { obterTarefas } from '../../database/Models';
import ListaTarefas from '../../components/ListaTarefas';

function Todas(){
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
    const pendentes = await obterTarefas('Pendente');
    const concluidas = await obterTarefas('Concluído');
    const tudo = [...pendentes, ...concluidas];
    setTarefas(tudo);
    if(pendentes == 'error' || concluidas == 'error'){
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
        <ListaTarefas
          tarefas = {tarefas}
          showStatus
        />
    </View>
  )
}

export default Todas;