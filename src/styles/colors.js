import { initialMode } from 'react-native-dark-mode'

function getColors(){ //CORES PARA MODO CLARO
  let colors = {};
  if( initialMode == 'light' ){
    colors = {
      background: '#F1F1F1',
      textUrgente: 'red',
      textDefault: '#444444',
      textPendente: 'orange',
      textConcluido: '#18C10D',
      button: 'blue',
      backModal: 'rgba(0,0,0,0.2)',
      deleteButton: '#B11414',
      backgroundTabBar: 'white',
      textTabBar: 'black',
      backgroundModal: 'white',
      placeHolderText: 'grey',
      textDeleteButton: 'white',
      buttonDisabled: '#98B1DA',
    }
  } else { //CORES PARA MODO ESCURO
    colors = {
      background: '#484848',
      textUrgente: 'red',
      textDefault: '#C4C4C4',
      textPendente: 'orange',
      textConcluido: '#18C10D',
      button: '#A7A7AE',
      backModal: 'rgba(0,0,0,0.4)',
      backgroundTabBar: '#525252',
      textTabBar: '#C4C4C4',
      backgroundModal: '#525252',
      placeHolderText: '#9B9B9B',
      buttonDisabled: '#5C5C5C',
      textDeleteButton: '#C4C4C4',
      deleteButton: '#7D3F3F'
    }
  }
  return colors;
}

const colors = getColors();

export default colors;