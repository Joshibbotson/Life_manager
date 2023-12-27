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
            "assignedTo" int NOT NULL,
            "completed" boolean NOT NULL,
            "dueDate" TIMESTAMP WITH TIME ZONE,

            PRIMARY KEY ("id"),
            CONSTRAINT "FK_DA9599E6A6BF3C8E68CBE51DDC2" FOREIGN KEY ("userId") REFERENCES "users" ("id")
        )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "todos";
    `)
  }
}
