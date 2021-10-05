import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput
} from 'react-native';
import { Icon } from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import { Button, Text } from 'react-native-paper';

export default function({visible, toggleModal}) {
  const [prioridade, setPrioridade] = useState ('media')
  const [isVisible, setIsVisible] = useState (true)

  function cancelarTarefa(){
    toggleModal();
  }

  function salvarTarefa(){

  }
  
  return(
    <Modal 
      visible = {visible && isVisible}
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
            fontSize: 15
          }}>
            Cadastrar nova tarefa
          </Text>
          <TextInput style = {{
            borderRadius: 7,
            borderWidth:1,
            width:'90%',
            paddingHorizontal: 20,
            borderColor: 'gray',
            marginTop: 10,
            fontSize:15
          }}
            placeholder = 'Nome'
          />
          <View style = {{width: '90%', marginBottom: 30}}>
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
                selectedValue = {prioridade}
                onValueChange={(itemValue) => setPrioridade(itemValue)}
                color = 'gray'
              >
                <Picker.Item label = "Alta" value = 'alto'/>
                <Picker.Item label = "Média" value = 'media'/>
                <Picker.Item label = "Baixa" value = 'baixo'/>
              </Picker>
            </View>
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
              onPress = {() => salvarTarefa()}
            >
              <View style = {{
                borderWidth: 1,
                borderRadius: 7,
                height: '100%',
                width: '100%',
                alignItems:'center',
                justifyContent: 'center',
                backgroundColor: 'blue'
              }}>
                <Text style = {{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                  Salvar
                </Text>
              </View>
            </TouchableOpacity>
          </View> 
        </View>
      </View>
    </Modal>
  )
}