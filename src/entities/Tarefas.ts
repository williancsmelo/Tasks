import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/browser';
import 'reflect-metadata'

@Entity()
export class Tarefas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'NOME', length: 70, nullable: false })
  nome: string;

  @Column({ type: 'varchar', name: 'PRIORIDADE', length: 10, nullable: false })
  prioridade: string;

  @Column({ type: 'varchar', name: 'DESCRICAO', nullable: true })
  descricao: string;

  @Column({ type: 'varchar', name: 'STATUS', length: 10, nullable: false })
  status: string;

  @Column({ type: 'varchar', name: 'DATA_CRIACAO', length: 10, nullable: false })
  dataCriacao: string;

  @Column({ type: 'varchar', name: 'DATA_CONCLUSAO', length: 10, nullable: true })
  dataConclusao: string;
}