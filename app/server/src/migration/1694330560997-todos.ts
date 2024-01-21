import { MigrationInterface, QueryRunner } from 'typeorm'

export class Todos1694330560997 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "todos" (
            "deletedDate" TIMESTAMP WITH TIME ZONE
            "createDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updateDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "version' int NOT NULL,
            "id" int NOT NULL AUTO_INCREMENT,
            "title" varchar(100) NOT NULL,
            "description" text NOT NULL,
            "createdBy" int NOT NULL,
            "completed" boolean NOT NULL,
            "completionDate" TIMESTAMP WITH TIME ZONE DEFAULT null,
            "dueDate" TIMESTAMP WITH TIME ZONE DEFAULT null,

            PRIMARY KEY ("id"),
        )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "todos";
    `)
  }
}
