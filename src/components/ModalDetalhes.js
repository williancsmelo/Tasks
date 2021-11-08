import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  ToastAndroid,
  StyleSheet
} from 'react-native';
import { Text } from 'react-native-paper';
import { apagarTarefaPorID, toggleStatus } from '../database/Models';
import { Icon } from 'react-native-elements'
import { EventRegister } from 'react-native-event-listeners';

import { colors, general } from '../styles';

export default function({visible, toggleModal, tarefa}) {
  async function apagarTarefa(){
    const req = await apagarTarefaPorID(tarefa.id)
    if(req == 'ok'){
      ToastAndroid.show('Tarefa apagada com sucesso!', ToastAndroid.LONG)
    } else {
      ToastAndroid.show('Erro ao apagar tarefa', ToastAndroid.LONG)
    }
    EventRegister.emit('atualizarTarefas')
    toggleModal();
  }
  async function atualizarStatus(){
    const status = tarefa.status
    const req = await toggleStatus(tarefa.id, tarefa.status)
    if(req == 'ok'){
      if(status == 'Pendente'){
        ToastAndroid.show('Tarefa concluída!', ToastAndroid.LONG)
      } else { ToastAndroid.show('Tarefa alterada para pendente!') }
    } else {
      if(status == 'Pendente'){
        ToastAndroid.show('Erro ao concluir tarefa')
      } else { ToastAndroid.show('Erro ao desfazer tarefa') }
    }
    EventRegister.emit('atualizarTarefas')
    toggleModal();
  }
  return(
    <Modal 
      visible = {visible}
      transparent = {true}
      onRequestClose = {() => toggleModal()}
      animationType = 'fade'
    >
      <View style = {styles.viewPageModal}>
        <View style = {styles.viewModal}>
          <Text style = {styles.titleModal}>
            Detalhes
          </Text>
          <View style = {{width: '90%'}}>
            <View style = {styles.viewItem}>
              <Text style = {styles.textLabel}
              >
                Tarefa:{' '}
              </Text>
              <Text style = {styles.textDado}>
                {tarefa.nome}
              </Text>
            </View>
            <View style = {styles.viewItem}>
              <Text style = {styles.textLabel}>
                Prioridade:{' '}
              </Text>
              <Text style = {[styles.textDado,{
                fontWeight: tarefa.prioridade == 4 ? 
                  'bold' : 
                  'normal',
                color: tarefa.prioridade == 4 ?
                  colors.textUrgente :
                  colors.textDefault
              }]}>
                {tarefa.prioridade}
              </Text>
            </View>
            <View style = {styles.viewItem}>
              <Text style = {styles.textLabel}>
                Status:{' '}
              </Text>
              <Text style = {[styles.textDado,{
                color: tarefa.status == 'Pendente' ? 
                  colors.textPendente : 
                  colors.textConcluido
              }]}
              >
                {tarefa.status}
              </Text>
            </View>
            {tarefa.descricao != '' ? (
              <View style = {styles.viewItem}>
                <Text style = {styles.textLabel}>
                  Descrição:{' '}
                </Text>
                <Text style = {styles.textDado}>
                  {tarefa.descricao}
                </Text>
              </View>
            ) : (
              <View style = {styles.viewItem}>
                <Text style = {styles.textLabel}
                >
                  Sem Descrição
                </Text>
              </View>
            )}
            <View style = {styles.viewItem}>
              <Text style = {styles.textLabel}
              >
                Data de Criação:{' '}
              </Text>
              <Text style = {styles.textDado}>
                {tarefa.dataCriacao}
              </Text>
            </View>
            {tarefa.dataConclusao != '' && (
              <View style = {styles.viewItem}>
                <Text style = {styles.textLabel}
                >
                  Data de Conclusão:{' '}
                </Text>
                <Text style = {styles.textDado}>
                  {tarefa.dataConclusao}
                </Text>
              </View>
            )}
            <View style = {styles.viewButtons}>
              <TouchableOpacity
                style = {styles.buttonCancelar}
                onPress = {() => toggleModal()}
              >
                <Text style = {{
                  fontWeight:'bold',
                  color: colors.textDefault
                }}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style = {styles.buttonApagar}
                onPress = {() => apagarTarefa()}
              >
                <Icon
                  name='trash-outline'
                  type = 'ionicon'
                  color = {colors.background}
                  size = {22}
                />
                <Text style = {{
                  fontWeight:'bold', 
                  color: colors.background 
                }}>
                  Apagar
                </Text>
              </TouchableOpacity>
              {tarefa.status == 'Pendente' ? (
                <TouchableOpacity 
                  style = {styles.buttonConcluir}
                  onPress = {() => atualizarStatus()}
                >
                  <Icon
                    name='checkmark-outline'
                    type = 'ionicon'
                    color = {colors.background}
                    size = {22}
                  />
                  <Text style = {{
                    fontWeight:'bold', 
                    color: colors.background 
                  }}>
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
                    color = {colors.background}
                    size = {22}
                    style = {{right: 2}}
                  />
                  <Text style = {{ 
                    fontWeight:'bold', 
                    color: colors.background
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
  ...general,

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
    borderColor: colors.button,
    borderWidth: 1.5,
    alignItems:'center',
    justifyContent:'center',
    width: '32%'
  },
  buttonApagar:{
    height: 50,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: colors.textDefault,
    alignItems:'center',
    justifyContent:'center',
    width: '32%',
    backgroundColor: colors.deleteButton,
    flexDirection:'row'
  },
  buttonConcluir:{
    borderColor: colors.textDefault,
    height: 50,
    borderRadius: 7,
    borderWidth: 1.5,
    alignItems:'center',
    justifyContent:'center',
    width: '32%',
    backgroundColor: colors.button,
    flexDirection:'row'
  },

  textLabel: {
    fontWeight: 'bold',
    fontSize: 15
  },

  textDado: {fontSize: 15},
})