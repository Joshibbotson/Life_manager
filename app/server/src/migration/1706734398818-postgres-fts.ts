import { MigrationInterface, QueryRunner } from "typeorm"

export class PostgresFts1706734398818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
      ALTER TABLE todos ADD COLUMN search_vector tsvector;

      UPDATE todos SET search_vector = to_tsvector('english', "title" || ' ' || "description");

      CREATE INDEX todos_search_vector_idx ON todos USING gin(search_vector);
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
