import { MigrationInterface, QueryRunner } from 'typeorm'

export class Users1701508320209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "users" (
            "deletedDate" TIMESTAMP WITH TIME ZONE
            "createDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updateDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "version' int NOT NULL,
            "id" int NOT NULL AUTO_INCREMENT,
            "name" varchar(100) NOT NULL,
            "email" text NOT NULL,
            "hashedPassword" varchar(255) NOT NULL,
            "active" varchar(255) NOT NULL,
            "locale" varchar(255) NOT NULL,
            "permissions string[] DEFAULT ARRAY[]::string[],
            PRIMARY KEY ("id"),
            CONSTRAINT "FK_A55FDA398CFEB520B9DC3D71242" FOREIGN KEY ("userId") REFERENCES "users" ("id")
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "users";
    `)
  }
}
