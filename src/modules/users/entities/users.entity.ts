import { AbstractEntity } from "src/database/abstract-entity";
import { Column, Entity } from "typeorm";

export enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER"
}

@Entity({name: "users"})
export class UsersEntiy extends AbstractEntity<UsersEntiy>{
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.VIEWER
  })
  role: UserRole;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string
}