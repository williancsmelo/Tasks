import React, {useEffect, useState} from 'react'
import { Tarefas } from '../../entities';
import { apagarTudo, obterTarefas } from '../../database/Models';
import { 
  View, 
  Text, 
  ToastAndroid, 
  Button, 
  ScrollView, 
  TouchableOpacity
} from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { List, Divider } from 'react-native-paper'
import {getConnectionManager} from 'typeorm/browser'
import { EventRegister } from 'react-native-event-listeners'
import styles from './styles'
import ModalDetalhes from '../../components/ModalDetalhes';

export function Pendentes(){
  const [tarefas, setTarefas] = useState([{
    id:'',
    nome:'',
    prioridade:'',
    descricao:'',
    status:'',
    dataCriacao:'',
    dataConclusao:''
  }])
  const [tarefaDetalhe, setTarefaDetalhe] = useState({
    id:'',
    nome:'',
    prioridade:'',
    descricao:'',
    status:'',
    dataCriacao:'',
    dataConclusao:''
  })
  const [tarefasSelecionadas, setTarefasSelecionadas] = useState ([])
  const [showTarefas, setShowTarefas] = useState(false)
  const [showDetalhes, setShowDetalhes] = useState(false)
  async function carregaTarefas(){
    const response = await obterTarefas()
    setTarefas(response)
    setShowTarefas(true)
    if(response == 'error'){
      ToastAndroid.show('Erro ao acessar o banco de dados', ToastAndroid.LONG)
    }
  }
  useEffect(() => {
    EventRegister.addEventListener('atualizarTarefas', () => dados())
    console.log('Conexão com o banco na tela Pendentes: ', getConnectionManager().has('default'))
    async function dados(){
      await carregaTarefas();
    }
  }, [])

  function mostrarDetalhes(tarefa){
    setTarefaDetalhe(tarefa);
    setShowDetalhes(true);
  }
  function listaTarefas(item){
    let selecionado = false
    async function toggleCheckBox(){
      if(!selecionado){
        selecionado = true;
        tarefasSelecionadas.push(item.id)
      } else {
        selecionado = false;
        const index = tarefasSelecionadas.indexOf(item.id)
        if(index > -1){
          tarefasSelecionadas.splice(index, 1)
        }
      }
    }
    return(
      <View key={item.id}>
        <TouchableOpacity
          onPress = {() => mostrarDetalhes(item)}
        >
          <View>
            <List.Item
              title = {item.nome}
              titleStyle = {{fontSize: 20}}
              description = {
                <View style = {{ flexDirection:'row' }}>
                  <Text style = {{ fontWeight: 'bold' }}
                  >
                    Prioridade:
                  </Text>
                  <View style = {{ width: 5 }}/>
                  <Text style = {{
                    fontWeight: item.prioridade == 'Urgente' ? 'bold' : 'normal',
                    color: item.prioridade == 'Urgente' ? 'red' : {}
                  }}>
                    {item.prioridade}
                  </Text>
                </View>
              }
              descriptionStyle = {{
                fontWeight: item.prioridade == 'urgente' ? 'bold' : 'normal',
                color: item.prioridade == 'urgente' ? 'red' : {}
              }}
              left = {() =>
                <View style = {{ justifyContent: 'center' }}>
                  <CheckBox
                    disabled={false}
                    value={selecionado}
                    onValueChange={() => toggleCheckBox()}
                    tintColors =  {{ true: 'blue', false: 'gray' }}
                  />
                </View>
              }
            />
          </View>
        </TouchableOpacity>
        <Divider/>
      </View>
    )
  }

  return(
    <View>
      <ScrollView>
        {showTarefas && (tarefas.map(item => listaTarefas(item)))}
      </ScrollView>
      <ModalDetalhes
        visible = {showDetalhes}
        toggleModal = {() => setShowDetalhes(!showDetalhes)}
        tarefa = {tarefaDetalhe}
        atualizaTarefas = {carregaTarefas}
      />
    </View>
  )
}

export default Pendentes;