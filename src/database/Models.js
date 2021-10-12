import { Tarefas } from '../entities';

import {getRepository} from 'typeorm';

export async function insereTarefa(tarefa){
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

export async function obterTarefas(){
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
      .getRawMany();

    console.info('Tarefas consultadas: ', queryResult)
    return queryResult;
  }
  catch(e){
    console.error('Erro ao consultar tarefas: ', e);
    return 'error'
  }
}