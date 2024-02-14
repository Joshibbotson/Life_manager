import { MigrationInterface, QueryRunner } from "typeorm"

export class Directory1706559713447 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "directories" (
                "createDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updateDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "version" INTEGER NOT NULL,
                "deletedDate" TIMESTAMP WITH TIME ZONE,
                "id" int NOT NULL AUTO_INCREMENT,
                "name" VARCHAR(100) NOT NULL,
                "parentId" INTEGER,

                PRIMARY KEY ("id"),
                CONSTRAINT "FK_directories_parentId" FOREIGN KEY ("parentId") REFERENCES "directories" ("id")
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
