import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  ToastAndroid,
  StyleSheet
} from 'react-native';
import {  Text } from 'react-native-paper';
import * as yup from 'yup'
import { apagarTarefaPorID, toggleStatus } from '../database/Models';
import { Icon } from 'react-native-elements'

export default function({visible, toggleModal, tarefa, atualizaTarefas}) {
  async function apagarTarefa(){
    const req = await apagarTarefaPorID(tarefa.id)
    if(req == 'ok'){
      ToastAndroid.show('Tarefa apagada com sucesso!', ToastAndroid.LONG)
    } else {
      ToastAndroid.show('Erro ao apagar tarefa', ToastAndroid.LONG)
    }
    atualizaTarefas();
    toggleModal();
  }
  async function atualizarStatus(){
    const status = tarefa.status
    const req = await toggleStatus(tarefa.id, tarefa.status)
    if(req == 'ok'){
      if(status == 'Pendente'){
        ToastAndroid.show('Tarefa concluída!', ToastAndroid.LONG)
      } else { ToastAndroid.show('Tarefa alterada para pendente!', ToastAndroid.LONG) }
    } else {
      if(status == 'Pendente'){
        ToastAndroid.show('Erro ao concluir tarefa', ToastAndroid.LONG)
      } else { ToastAndroid.show('Erro ao desfazer tarefa', ToastAndroid.LONG) }
    }
    atualizaTarefas();
    toggleModal();
  }
  return(
    <Modal 
      visible = {visible}
      transparent = {true}
      onRequestClose = {() => toggleModal()}
      animationType = 'fade'
    >
      <View style={{
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
      }}>
        <View style = {{
          flexDirection: 'column',
          backgroundColor: '#fff',
          width: '90%',
          alignItems:'center',
          borderRadius: 7,
          padding:10
        }}>
          <Text style = {{
            fontSize: 18,
            marginBottom: 7
          }}>
            Detalhes
          </Text>
          <View style = {{width: '90%'}}>
            <View style = {styles.viewItem}>
              <Text style = {{
                fontWeight: 'bold',
                fontSize: 15
                }}
              >
                Tarefa:
              </Text>
              <View style = {{ width: 5 }}/>
              <Text style = {{ fontSize: 15 }}>
                {tarefa.nome}
              </Text>
            </View>
            <View style = {styles.viewItem}>
              <Text style = {{
                fontWeight: 'bold',
                fontSize: 15
                }}
              >
                Prioridade:
              </Text>
              <View style = {{ width: 5 }}/>
              <Text style = {{ 
                fontSize: 15,
                fontWeight: tarefa.prioridade == 'Urgente' ? 'bold' : 'normal',
                color: tarefa.prioridade == 'Urgente' ? 'red' : 'black'
                }}
              >
                {tarefa.prioridade}
              </Text>
            </View>
            <View style = {styles.viewItem}>
              <Text style = {{
                fontWeight: 'bold',
                fontSize: 15
                }}
              >
                Status:
              </Text>
              <View style = {{ width: 5 }}/>
              <Text style = {{ 
                fontSize: 15,
                color: tarefa.status == 'Pendente' ? 'orange' : '#18C10D'
                }}
              >
                {tarefa.status}
              </Text>
            </View>
            {tarefa.descricao != '' ? (
              <View style = {styles.viewItem}>
                <Text style = {{
                  fontWeight: 'bold',
                  fontSize: 15
                  }}
                >
                  Descrição:
                </Text>
                <View style = {{ width: 5 }}/>
                <Text style = {{ fontSize: 15 }}>
                  {tarefa.descricao}
                </Text>
              </View>
            ) : (
              <Text style = {{
                fontWeight: 'bold',
                fontSize: 15,
                marginBottom: 7
                }}
              >
                Sem Descrição
              </Text>
            )}
            <View style = {styles.viewItem}>
              <Text style = {{
                fontWeight: 'bold',
                fontSize: 15
                }}
              >
                Data de Criação:
              </Text>
              <View style = {{ width: 5 }}/>
              <Text style = {{ fontSize: 15 }}>
                {tarefa.dataCriacao}
              </Text>
            </View>
            {tarefa.dataConclusao != '' && (
              <View style = {styles.viewItem}>
                <Text style = {{
                  fontWeight: 'bold',
                  fontSize: 15
                  }}
                >
                  Data de Conclusão:
                </Text>
                <View style = {{ width: 5 }}/>
                <Text style = {{ fontSize: 15 }}>
                  {tarefa.dataConclusao}
                </Text>
              </View>
            )}
            <View style = { styles.viewButtons }>
              <TouchableOpacity 
                style = {styles.buttonCancelar}
                onPress = {() => toggleModal()}
              >
                <Text style = {{ fontWeight:'bold' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style = {styles.buttonApagar}
                onPress = {() => apagarTarefa()}
              >
                <Icon
                  name='trash-outline'
                  type = 'ionicon'
                  color = 'white'
                  size = {22}
                />
                <Text style = {{ fontWeight:'bold', color: 'white' }}>Apagar</Text>
              </TouchableOpacity>
              {tarefa.status == 'Pendente' ? (
                <TouchableOpacity 
                  style = {styles.buttonConcluir}
                  onPress = {() => atualizarStatus()}
                >
                  <Icon
                    name='checkmark-outline'
                    type = 'ionicon'
                    color = 'white'
                    size = {22}
                  />
                  <Text style = {{ fontWeight:'bold', color: 'white' }}>
                    Concluir
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style = {styles.buttonConcluir}
                  onPress = {() => atualizarStatus()}
                >
                  <Icon
                    name='arrow-undo-outline'
                    type = 'ionicon'
                    color = 'white'
                    size = {22}
                    style = {{right: 2}}
                  />
                  <Text style = {{ 
                    fontWeight:'bold', 
                    color: 'white'
                    }}
                  >
                    Desfazer
                  </Text>
                </TouchableOpacity>
              )}

            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  viewItem:{
    flexDirection: 'row',
    marginBottom: 7
  },
  viewButtons:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7
  },
  buttonCancelar:{
    height: 50,
    borderRadius: 7,
    borderColor: 'blue',
    borderWidth: 1,
    alignItems:'center',
    justifyContent:'center',
    width: '30%'
  },
  buttonApagar:{
    height: 50,
    borderRadius: 7,
    borderWidth: 1,
    alignItems:'center',
    justifyContent:'center',
    width: '30%',
    backgroundColor: '#B11414',
    flexDirection:'row'
  },
  buttonConcluir:{
    height: 50,
    borderRadius: 7,
    borderWidth: 1,
    alignItems:'center',
    justifyContent:'center',
    width: '30%',
    backgroundColor: 'blue',
    flexDirection:'row'
  },
})