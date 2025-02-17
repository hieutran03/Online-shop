import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1739762246434 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table users (
        id int generated by default as identity primary key,
        name varchar(50) not null,
        phone varchar(10) not null
      );  
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      drop table users;
    `)
  }

}
