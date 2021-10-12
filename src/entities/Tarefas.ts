import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tarefas {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', name: 'NOME' })
  nome: string;

  @Column({ type: 'varchar', name: 'PRIORIDADE' })
  prioridade: string;

  @Column({ type: 'varchar', name: 'DESCRICAO' })
  descricao: string;

  @Column({ type: 'varchar', name: 'STATUS' })
  status: string;

  @Column({ type: 'varchar', name: 'DATA_CRIACAO' })
  dataCriacao: string;

  @Column({ type: 'varchar', name: 'DATA_CONCLUSAO' })
  dataConclusao: string;
}