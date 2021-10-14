import React, { useState } from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { List, Divider } from 'react-native-paper'
import ModalDetalhes from './ModalDetalhes';

export default function ListaTarefas({tarefas, carregaTarefas, showStatus}){
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
                <View style = {{ flexDirection:'row', width:'100%' }}>
                  <View style = {{flexDirection: 'row', width:280, justifyContent: 'space-between'}}>
                    <View style = {{flexDirection: 'row'}}>
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
                    {showStatus && (
                      <View style = {{flexDirection:'row'}}>
                        <Text style = {{ fontWeight: 'bold' }}>
                          Status: 
                        </Text>
                        <View style = {{ width: 5 }}/>
                        <Text 
                          style = {{ 
                            color: item.status == 'Pendente' ? 'orange' : '#18C10D'
                          }}
                        >
                          {item.status}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              }
              descriptionStyle = {{
                fontWeight: item.prioridade == 'urgente' ? 'bold' : 'normal',
                color: item.prioridade == 'urgente' ? 'red' : {},
              }}
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