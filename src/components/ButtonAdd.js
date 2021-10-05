import React, { useState, useRef } from 'react';
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
import ModalNovaTarefa from './ModalNovaTarefa';

export default function (){
  const [showModal,setShowModal] = useState(false)

  function toggleModal(){
    setShowModal(!showModal);
  }

  return(
    <View>
      <View style={{
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 30, 
        width: '100%',
        height: 125,
        flex:1
        }}>
        <TouchableOpacity 
          onPress = {() => toggleModal()}
          style = {{
            width:'22%',
            alignSelf:'flex-end',
            alignItems:'center',
            justifyContent:'center',
            alignContent:'center',
            right:30,
            borderRadius:1000,
            height:'75%'
          }}
        >
          <Icon
            name='add-circle'
            type = 'ionicon'
            color = 'blue'
            size = {100}
          />
        </TouchableOpacity>
      </View>

      <ModalNovaTarefa 
        visible = {showModal}
        toggleModal = {() => toggleModal()}
      />
    </View>
  )
}