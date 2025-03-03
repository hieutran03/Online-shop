import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1740915741191 implements MigrationInterface {
    name = 'UpdateUser1740915741191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "delete_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "delete_at"`);
    }

}
