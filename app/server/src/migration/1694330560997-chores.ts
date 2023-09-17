import { MigrationInterface, QueryRunner } from "typeorm";

export class Chores1694330560997 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "chores" (
            "id" int NOT NIULL AUTO_INCREMENT,
            "name" varchar(100) NOT NULL,
            "description" text NOT NULL,
            "createdBy" varchar(255) NOT NULL,
            "assigntedTo" varchar(255) NOT NULL,
            "completed" boolean NOT NULL,
            "userId" int NOT NULL,
            PRIMARY KEY ("id"),
            CONSTRAINT "FK_DA9599E6A6BF3C8E68CBE51DDC2" FOREIGN KEY ("userId") REFERENCES "users" ("id")
        )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE "chores";
    `);
    }
}
