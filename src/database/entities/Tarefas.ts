import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tarefas')
export class Tarefas {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', name: 'NOME', length: 70, nullable: true })
  nome: string;

  @Column({ type: 'varchar', name: 'PRIORIDADE', length: 10, nullable: false })
  prioridade: string;

  @Column({ type: 'varchar', name: 'DESCRICAO', nullable: true })
  descricao: string;

  @Column({ type: 'varchar', name: 'STATUS', length: 10, nullable: false })
  status: string;

  @Column({ type: 'varchar', name: 'DATA_CRIACAO', nullable: false })
  dataCriacao: string;

  @Column({ type: 'varchar', name: 'DATA_CONCLUSAO', nullable: true })
  dataConclusao: string;
}