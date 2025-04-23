import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnImageNewsCategory1745396634706 implements MigrationInterface {
    name = 'AddColumnImageNewsCategory1745396634706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" ADD "category" character varying`);
        await queryRunner.query(`ALTER TABLE "news" ADD "imageUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "category"`);
    }

}
