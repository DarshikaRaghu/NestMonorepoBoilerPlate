import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1743085894377 implements MigrationInterface {
    name = 'UpdateUserTable1743085894377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    }

}
