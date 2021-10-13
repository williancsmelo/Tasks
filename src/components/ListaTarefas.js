import React, {useEffect, useState} from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { List, Divider } from 'react-native-paper'
import ModalDetalhes from './ModalDetalhes';

export default function ListaTarefas({tarefas, carregaTarefas}){
  const [showDetalhes, setShowDetalhes] = useState(false)
  const [tarefaDetalhe, setTarefaDetalhe] = useState({
    id:'',
    nome:'',
    prioridade:'',
    descricao:'',
    status:'',
    dataCriacao:'',
    dataConclusao:''
  })
  function lista(item){
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
    function mostrarDetalhes(tarefa){
      setTarefaDetalhe(tarefa);
      setShowDetalhes(true);
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
        <ModalDetalhes
          visible = {showDetalhes}
          toggleModal = {() => setShowDetalhes(!showDetalhes)}
          tarefa = {tarefaDetalhe}
          atualizaTarefas = {carregaTarefas}
        />
      </View>
    )
  }
return(
    <ScrollView>
      {tarefas.map(item => lista(item))}
    </ScrollView>
  )
}