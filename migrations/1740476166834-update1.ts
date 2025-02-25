import { MigrationInterface, QueryRunner } from "typeorm";

export class Update11740476166834 implements MigrationInterface {
    name = 'Update11740476166834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_entity" ALTER COLUMN "deleted" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_entity" ALTER COLUMN "deleted" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_entity" ALTER COLUMN "deleted" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_entity" ALTER COLUMN "deleted" SET NOT NULL`);
    }

}
