import CartEntity from "../../../modules/cart/entities/cart.entity";
import { AbstractEntity } from "../../../database/abstract-entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

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
  email: string;

  @Column({name: 'cart_id'})
  cartId: number

  @OneToOne(() => CartEntity, (cart) => cart.user, {cascade: true})
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;
}