import { MigrationInterface, QueryRunner } from 'typeorm'

export class Todos1694330560997 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);

    await queryRunner.query(`
        CREATE TABLE "todos" (
            "id" int NOT NULL AUTO_INCREMENT,
            "title" varchar(100) NOT NULL,
            "description" text NOT NULL,
            "createdBy" int NOT NULL,
            "completed" boolean NOT NULL,
            "completionDate" TIMESTAMP WITH TIME ZONE DEFAULT null,
            "dueDate" TIMESTAMP WITH TIME ZONE DEFAULT null,

            PRIMARY KEY ("id"),
            CONSTRAINT "FK_todos_createdBy" FOREIGN KEY ("createdBy") REFERENCES "users" ("id"),
            CONSTRAINT "FK_todos_directory" FOREIGN KEY ("directory") REFERENCES "directories" ("id")
        )
        `)
          // Update the search_vector column with concatenated title and description
          await queryRunner.query(`
            UPDATE "todos" SET "search_vector" = to_tsvector('english', "title" || ' ' || "description");
      `);

          // Create a GIN index on the search_vector column
          await queryRunner.query(`
            CREATE INDEX "todos_search_vector_idx" ON "todos" USING GIN("search_vector");
          `);


  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "todos";
    `)
  }
}
