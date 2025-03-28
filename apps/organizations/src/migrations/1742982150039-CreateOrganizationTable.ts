import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrganizationTable1742982150039 implements MigrationInterface {
    name = 'CreateOrganizationTable1742982150039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_5d06de67ef6ab02cbd938988bb1" UNIQUE ("email"), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "organization"`);
    }

}
