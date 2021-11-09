import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ToastAndroid,
  Text,
  StyleSheet
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as yup from 'yup'
import { insereTarefa } from '../database/Models';
import Loader from 'react-native-modal-loader';
import { EventRegister } from 'react-native-event-listeners'

import { general, colors } from '../styles';

const novaTarefaValidation = yup.object().shape({
  nome: yup
    .string('Insira um nome para a tarefa')
    .required('Insira um nome para a tarefa')
});

export default function({visible, toggleModal}) {
  const [isLoading, setIsLoading] = useState(false)
  async function cancelarTarefa(){
    toggleModal();
  };
  async function salvarTarefa(dados){
    setIsLoading(true);                
    const objEnvio = {
      nome: dados.nome,
      prioridade: dados.prioridade,
      descricao: dados.descricao,
      status: 'Pendente',
      dataCriacao: '',
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
    EventRegister.emit('atualizarTarefas')
  };

  return(
    <Modal 
      visible = {visible}
      transparent = {true}
      onRequestClose = {() => toggleModal()}
      animationType = 'fade'
    >
      <Loader loading = {isLoading} color = 'blue'/>
      <View style={styles.viewPageModal}>
        <Formik
          initialValues = {{
            nome: null,
            prioridade: 2,
            descricao: ''
          }}
          onSubmit = {(values) => salvarTarefa(values)}
          validationSchema = {novaTarefaValidation}
        >
          {({
          values,
          handleChange, 
          handleSubmit, 
          errors, 
          touched, 
          isValid, 
          setFieldTouched,
          setFieldValue
          }) => (
            <View style = {{
              flexDirection: 'column',
              backgroundColor: colors.backgroundModal,
              width: '90%',
              alignItems:'center',
              borderRadius: 7,
              padding:10
            }}>
              <Text style = {{
                fontSize: 15,
                color: colors.textDefault
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
                fontSize:15,
                color: colors.textDefault
              }}
                placeholderTextColor = {colors.placeHolderText}
                placeholder = 'Nome'
                value = {values.nome}
                onChangeText = {handleChange('nome')}
                onBlur = {() => {setFieldTouched('nome', true)}}
              />
              <View style = {{width: '90%'}}>
                <Text style={{
                  marginTop: 10,
                  alignSelf:'flex-start',
                  width:'90%',
                  color: colors.textDefault
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
                    color: colors.textDefault
                  }}
                    dropdownIconColor = {colors.textDefault}
                    enabled = {true}
                    selectedValue = {values.prioridade}
                    onValueChange = {value => setFieldValue('prioridade', value)}
                  >
                    <Picker.Item
                      label = "Urgente" 
                      value = {4} 
                      key = {4}
                    />
                    <Picker.Item 
                      label = "Alta" 
                      value = {3} 
                      key = {3}
                    />
                    <Picker.Item 
                      label = "Média" 
                      value = {2} 
                      key = {2}
                    />
                    <Picker.Item 
                      label = "Baixa" 
                      value = {1} 
                      key = {1}
                    />
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
                  placeholderTextColor = {colors.placeHolderText}
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
                    borderColor: colors.button,
                    height: '100%',
                    width: '100%',
                    alignItems:'center',
                    justifyContent: 'center'
                  }}>
                    <Text style = {{
                      fontSize: 15, 
                      fontWeight:'bold',
                      color: colors.textDefault
                    }}>
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
                    backgroundColor: isValid ? colors.button : colors.buttonDisabled
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

const styles = StyleSheet.create({
  ...general
})