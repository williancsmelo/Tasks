import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasks1633629642656 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('INSERT INTO `tarefas` (`1`,`NOME`,`PRIORIDADE`, `DESCRICAO`, `STATUS`, `DATA_CRIACAO`, `DATA_CONCLUSAO`) VALUES ("teste migration","urgente","describe","pendete", "hoje","")');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM tarefas');
    }
}