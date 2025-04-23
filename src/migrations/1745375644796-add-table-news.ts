import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableNews1745375644796 implements MigrationInterface {
    name = 'AddTableNews1745375644796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "deletedAt" TIMESTAMP, "createdbyId" uuid, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_9a4a663db79d25008cc4ef6b5ed" FOREIGN KEY ("createdbyId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_9a4a663db79d25008cc4ef6b5ed"`);
        await queryRunner.query(`DROP TABLE "news"`);
    }

}
