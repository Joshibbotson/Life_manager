import { MigrationInterface, QueryRunner } from 'typeorm'

export class Todos1694330560997 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "todos" (
            ds
            "id" int NOT NULL AUTO_INCREMENT,
            "title" varchar(100) NOT NULL,
            "description" text NOT NULL,
            "createdBy" int NOT NULL,
            "directory" int NOT NULL,
            "completed" boolean NOT NULL,
            "completionDate" TIMESTAMP WITH TIME ZONE DEFAULT null,
            "dueDate" TIMESTAMP WITH TIME ZONE DEFAULT null,

            PRIMARY KEY ("id"),
            CONSTRAINT "FK_todos_createdBy" FOREIGN KEY ("createdBy") REFERENCES "users" ("id"),
            CONSTRAINT "FK_todos_directory" FOREIGN KEY ("directory") REFERENCES "directories" ("id")
        )
        `)

      await queryRunner.query(`
      ALTER TABLE todos ADD COLUMN search_vector tsvector;

      UPDATE todos SET search_vector = to_tsvector('english', "title" || ' ' || "description");

      CREATE INDEX todos_search_vector_idx ON todos USING gin(search_vector);
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "todos";
    `)
  }
}
