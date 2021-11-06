import React, { useState } from 'react';
import {
  View,
} from 'react-native';
import ModalNovaTarefa from './ModalNovaTarefa';
import {  IconButton } from 'react-native-paper'
import { colors } from '../styles/';

export default function (){
  const [showModal,setShowModal] = useState(false)
  function toggleModal(){
    setShowModal(!showModal)
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
        flex:1,
        justifyContent:'center'
        }}
      >
        <IconButton
          icon = 'plus-circle'
          size = {100}
          color = {colors.button}
          animated = {true}
          style = {{
            height: 80,
            width:80,
            alignSelf: 'flex-end',
            right: 40,
            bottom: 20
          }}
          onPress = {() => toggleModal()}
        />
      </View>

      <ModalNovaTarefa 
        visible = {showModal}
        toggleModal = {() => toggleModal()}
      />
    </View>
  )
}