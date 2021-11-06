import React, { useState } from 'react'
import { 
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { List, Divider } from 'react-native-paper'
import { colors } from '../styles/';
import ModalDetalhes from './ModalDetalhes';

export default function ListaTarefas({tarefas, carregaTarefas, showStatus}){
  const [showDetalhes, setShowDetalhes] = useState(false)
  const [tarefaDetalhe, setTarefaDetalhe] = useState({})
  function lista(item){
    if(item.nome == '' || item.nome == null) {return null}
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
                <View>
                  <View>
                    <View style = {{flexDirection: 'row'}}>
                      <Text style = {{fontWeight: 'bold'}}>
                        Prioridade:{' '}
                      </Text>
                      <Text style = {{
                        fontWeight: item.prioridade == 'Urgente' ? 
                          'bold' : 
                          'normal',
                        color: item.prioridade == 'Urgente' ?
                          colors.textUrgente : 
                          {}//colors.textDefault
                      }}>
                        {item.prioridade}
                      </Text>
                    </View>
                    {showStatus && (
                      <View style = {{flexDirection:'row'}}>
                        <Text style = {{fontWeight: 'bold'}}>
                          Status:{' '}
                        </Text>
                        <Text 
                          style = {{ 
                            color: item.status == 'Pendente' ? 
                              colors.textPendente : 
                              colors.textConcluido
                          }}
                        >
                          {item.status}
                        </Text>
                      </View>
                    )}
                  </View>
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