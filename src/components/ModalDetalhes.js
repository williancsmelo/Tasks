import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ToastAndroid,
  StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import { Button, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup'
import { insereTarefa, obterTarefas } from '../database/Models';
import Loader from 'react-native-modal-loader';

const novaTarefaValidation = yup.object().shape({
  nome: yup
    .string('Insira um nome para a tarefa')
    .required('Insira um nome para a tarefa')
});

export default function({visible, toggleModal, tarefa}) {
  const [isLoading, setIsLoading] = useState(false)
  async function cancelarTarefa(){
    const tarefas = await obterTarefas();
    console.log(tarefas);
    toggleModal();
  };
  async function salvarTarefa(dados){
    setIsLoading(true);
    const currentdate = new Date(); 
    const datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    const objEnvio = {
      nome: dados.nome,
      prioridade: dados.prioridade,
      descricao: dados.descricao,
      status: 'pendente',
      dataCriacao: datetime,
      dataConclusao:''
    }
    const envio = await insereTarefa(objEnvio);
    setIsLoading(false);
    if(envio == 'ok'){
      ToastAndroid.show('Tarefa adicionada com sucesso!', ToastAndroid.LONG);
      toggleModal();
    } else {
      ToastAndroid.show('Erro ao adicionar a tarefa', ToastAndroid.LONG)
    }

    const tarefas = await obterTarefas();
    console.log(tarefas)
  };

  return(
    <Modal 
      visible = {visible}
      transparent = {true}
      onRequestClose = {() => toggleModal()}
      animationType = 'fade'
    >
      <Loader loading = {isLoading} color = 'blue'/>
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
                fontWeight: tarefa.status == 'Pendente' ? 'normal' : 'bold',
                color: tarefa.status == 'Pendente' ? 'orange' : '#00ff00'
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
})