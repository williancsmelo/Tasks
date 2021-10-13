import { Tarefas } from '../entities';

import {getRepository, getConnection} from 'typeorm';

function dataAtual(){
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
  return datetime;
}

export async function insereTarefa(tarefa){
  const datareg = dataAtual();
  tarefa.dataCriacao = datareg;
  try{
    const response = await getRepository(Tarefas).save(tarefa);
    console.info('Tarefa criada: ', response);
    return 'ok';
  }
  catch(e){
    console.error(e);
    return ['error']
  }
}

export async function obterTarefas(status){
  try{
    const queryResult = await getRepository(Tarefas)
      .createQueryBuilder('tasks')
      .select([
        'tasks.id AS id',
        'tasks.NOME AS nome',
        'tasks.PRIORIDADE AS prioridade',
        'tasks.DESCRICAO AS descricao',
        'tasks.STATUS AS status',
        'tasks.DATA_CRIACAO AS dataCriacao',
        'tasks.DATA_CONCLUSAO AS dataConclusao',
      ])
      if(status != null) { queryResult.where('STATUS = :status',{status: status}) }
      const finalQuery = queryResult.getRawMany();

    console.info('Tarefas consultadas: ', finalQuery)
    return finalQuery;
  }
  catch(e){
    console.error('Erro ao consultar tarefas: ', e);
    return 'error'
  }
}

export async function apagarTarefaPorID(id){
  try{
    const req = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Tarefas)
      .where("id = :id", { id: id })
      .execute();
    console.log('Tarefa de id: ', id, 'apagada do banco de dados')
    console.log(req)
    return 'ok'
  }
  catch(e){
    console.error('Erro ao apagar tarefa de id: ', id);
    console.error('Erro: ', e);
    return 'error'
  }
}

export async function toggleStatus(id, status){
  const novoStatus = status == 'Pendente' ? 'Concluído' : 'Pendente'
  try{
    const req = await getConnection()
    .createQueryBuilder()
    .update(Tarefas)
    .set({ 
      status: novoStatus, 
      dataConclusao: novoStatus == 'Concluído' ? dataAtual() : '' })
    .where("id = :id", { id: id })
    .execute();
    console.log('Status da tarefa de id: ' + id + 'alterado para ' + novoStatus)
    console.log(req)
    return 'ok'
  }
  catch(e){
    console.error('Erro ao apagar tarefa de id: ', id);
    console.error('Erro: ', e);
    return 'error'
  }
}

export async function apagarTudo(){
  try{
    const req = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Tarefas)
      .execute();
    console.log('Todas as tarefas foram deletadas')
    console.log(req)
    return 'ok'
  }
  catch(e){
    console.error('Erro ao apagar tudo');
    console.error('Erro: ', e);
    return 'error'
  }
}
