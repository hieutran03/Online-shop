import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTbCategoryTbProduct1740560534358 implements MigrationInterface {
    name = 'CreateTbCategoryTbProduct1740560534358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "images" character varying NOT NULL, "price" integer NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_category" ("productsId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_ffb3155333260001e37a20ec94e" PRIMARY KEY ("productsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a32cf3cfd513cd9feb72c64f86" ON "product_category" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6f7a71fa78a0e644b753b33a03" ON "product_category" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "delete_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "delete_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "products" ADD "deleted" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "deleted" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD CONSTRAINT "FK_a32cf3cfd513cd9feb72c64f864" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD CONSTRAINT "FK_6f7a71fa78a0e644b753b33a034" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_category" DROP CONSTRAINT "FK_6f7a71fa78a0e644b753b33a034"`);
        await queryRunner.query(`ALTER TABLE "product_category" DROP CONSTRAINT "FK_a32cf3cfd513cd9feb72c64f864"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "deleted"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "deleted"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "delete_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "products" ADD "delete_at" TIMESTAMP`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f7a71fa78a0e644b753b33a03"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a32cf3cfd513cd9feb72c64f86"`);
        await queryRunner.query(`DROP TABLE "product_category"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
