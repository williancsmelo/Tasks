export function descricaoPrioridade(prioridade){
  switch(prioridade){
    case '1':
      return 'Baixa';
    case '2':
      return 'Média';
    case '3':
      return 'Alta';
    case '4':
      return 'Urgente';
  }
}