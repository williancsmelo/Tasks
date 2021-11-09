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
import { descricaoPrioridade } from '../utils/utilitarios';

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
              titleStyle = {{
                fontSize: 20,
                color: colors.textDefault
              }}
              description = {
                <View>
                  <View>
                    <View style = {{flexDirection: 'row'}}>
                      <Text style = {{
                        fontWeight: 'bold',
                        color: colors.textDefault

                        }}>
                        Prioridade:{' '}
                      </Text>
                      <Text style = {{
                        fontWeight: item.prioridade == 4 ? 
                          'bold' : 
                          'normal',
                        color: item.prioridade == 4 ?
                          colors.textUrgente : 
                          colors.textDefault
                      }}>
                        {descricaoPrioridade(item.prioridade)}
                      </Text>
                    </View>
                    {showStatus && (
                      <View style = {{flexDirection:'row'}}>
                        <Text style = {{
                          fontWeight: 'bold',
                          color: colors.textDefault
                        }}
                        >
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