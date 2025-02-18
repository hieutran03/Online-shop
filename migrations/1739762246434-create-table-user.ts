import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1739762246434 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create type role_based_enum as enum(
        'ADMIN',
        'EDITOR',
        'VIEWER'
      );
      create table users (
        id int generated by default as identity primary key,
        name varchar(255) not null,
        role role_based_enum default 'VIEWER',
        username varchar(255) not null,
        password varchar(255) not null,
        email varchar(255) not null
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      drop table users;
      drop type role_based_enum;
    `)
  }

}
