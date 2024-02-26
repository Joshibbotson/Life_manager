import { MigrationInterface, QueryRunner } from "typeorm"

export class PostgresFts1706734398818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);

        await queryRunner.query(`
        ALTER TABLE "todos" ADD COLUMN "search_vector" tsvector;

        UPDATE "todos" SET "search_vector" = to_tsvector('english', "title" || ' ' || "description");

        CREATE INDEX todos_search_vector_idx ON "todos" USING GIN(search_vector);
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
