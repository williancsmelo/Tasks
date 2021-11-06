import { initialMode } from 'react-native-dark-mode';

function getColors(){ //CORES PARA MODO CLARO
  let colors = {};
  if( initialMode == 'light' ){
    colors = {
      background: '#F1F1F1',
      textUrgente: 'red',
      textDefault: 'black',
      textPendente: 'orange',
      textConcluido: '#18C10D',
      button: 'blue',
      backModal: 'rgba(0,0,0,0.2)',
      deleteButton: '#B11414'
    }
  } else { //CORES PARA MODO ESCURO
    colors = {
      background: '#F1F1F1',
      textUrgente: 'red',
      textDefault: 'black',
      textPendente: 'orange',
      textConcluido: '#18C10D',
      button: 'blue',
      backModal: 'rgba(0,0,0,0.2)'
    }
  }
  return colors;
}

const colors = getColors();

export default colors;