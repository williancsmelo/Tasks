import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ToastAndroid
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

export default function({visible, toggleModal}) {
  const [isLoading, setIsLoading] = useState(false)
  async function cancelarTarefa(){
    const tarefas = await obterTarefas();
    console.log(tarefas);
    toggleModal();
  };
  async function salvarTarefa(dados){
    setIsLoading(true);
    const currentdate = new Date();
    let horas = currentdate.getHours()
    if((horas - 10) < 0){
      horas = '0' + horas
    }
    let minutos = currentdate.getMinutes()
    if((minutos - 10) < 0){
      minutos = '0' + minutos
    }
    const datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "  |  "  
                + horas + ":" + minutos
                
    const objEnvio = {
      nome: dados.nome,
      prioridade: dados.prioridade,
      descricao: dados.descricao,
      status: 'Pendente',
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
        <Formik
          initialValues = {{
            nome: null,
            prioridade: 'Media',
            descricao: ''
          }}
          onSubmit = {(values) => salvarTarefa(values)}
          validationSchema = {novaTarefaValidation}
        >
          {({values, handleChange, handleSubmit, errors, touched, isValid, setFieldTouched}) => (
            <View style = {{
              flexDirection: 'column',
              backgroundColor: '#fff',
              width: '90%',
              alignItems:'center',
              borderRadius: 7,
              padding:10
            }}>
              <Text style = {{
                fontSize: 15
              }}>
                Cadastrar nova tarefa
              </Text>
              <TextInput style = {{
                borderRadius: 7,
                borderWidth:1,
                width:'90%',
                paddingHorizontal: 20,
                borderColor: isValid ? 'gray' : 'red',
                marginTop: 10,
                fontSize:15
              }}
                placeholder = 'Nome'
                value = {values.nome}
                onChangeText = {handleChange('nome')}
                onBlur = {() => {setFieldTouched('nome', true)}}
              />
              <View style = {{width: '90%'}}>
                <Text style={{
                  marginTop: 10,
                  alignSelf:'flex-start',
                  width:'90%'
                }}>
                  Prioridade:
                </Text>
                <View style = {{
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 7,
                  height : 50,
                  justifyContent:'center',
                }}>
                  <Picker style = {{
                    borderWidth: 1,
                    borderColor: 'gray',
                    width: '100%',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                    enabled = {true}
                    selectedValue = {values.prioridade}
                    onValueChange = {handleChange('prioridade')}
                    color = 'gray'
                  >
                    <Picker.Item label = "Urgente" value = 'Urgente'/>
                    <Picker.Item label = "Alta" value = 'Alta'/>
                    <Picker.Item label = "Média" value = 'Media'/>
                    <Picker.Item label = "Baixa" value = 'Baixa'/>
                  </Picker>
                </View>
                <TextInput style = {{
                  borderRadius: 7,
                  borderWidth:1,
                  width:'100%',
                  paddingHorizontal: 20,
                  borderColor: 'gray',
                  marginTop: 27,
                  fontSize:15,
                  height:100,
                }}
                  placeholder = 'Descrição'
                  multiline = {true}
                  textAlignVertical='top'
                  value = {values.descricao}
                  onChangeText = {handleChange('descricao')}
                />
              </View>
              <View style = {{width: '90%', height: 30, alignItems: 'center', justifyContent: 'center'}}>
                {(errors.nome && touched.nome) &&
                  <Text style = {{color: 'red'}}>
                    Insira um nome para a tarefa
                  </Text>
                }
              </View>
              <View style = {{
                width: '90%', 
                flexDirection:'row',
                height: 50,
                justifyContent: 'space-between',
                marginBottom:7
              }}>
                <TouchableOpacity style = {{
                    height: '100%', 
                    width: '45%'
                  }}
                  onPress = {() => cancelarTarefa()}
                >
                  <View style = {{
                    borderWidth: 1,
                    borderRadius: 7,
                    borderColor: 'blue',
                    height: '100%',
                    width: '100%',
                    alignItems:'center',
                    justifyContent: 'center'
                  }}>
                    <Text style = {{fontSize: 15, fontWeight:'bold'}}>
                      Cancelar
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style = {{
                    height: '100%', 
                    width: '45%'
                  }}
                  onPress = {handleSubmit}
                  disabled = {!isValid}
                >
                  <View style = {{
                    borderWidth: 1,
                    borderRadius: 7,
                    height: '100%',
                    width: '100%',
                    alignItems:'center',
                    justifyContent: 'center',
                    backgroundColor: isValid ? 'blue' : '#8C99F9'
                  }}>
                    <Text style = {{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                      Salvar
                    </Text>
                  </View>
                </TouchableOpacity>
              </View> 
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  )
}