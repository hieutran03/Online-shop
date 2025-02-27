import { AbstractEntity } from "../../../database/abstract-entity";
import { UsersEntiy } from "../../users/entities/users.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { CartItemEntity } from "./cart-item.entity";

@Entity({ name: 'cart' })
export default class CartEntity extends AbstractEntity<CartEntity>{
  // @Column({name: 'user_id'})
  // userId: number;

  @OneToOne(() => UsersEntiy, (user)=> user.cart)
  user: UsersEntiy;

  @OneToMany(() => CartItemEntity, cartItem => cartItem.cart, {cascade: true})
  cartItems: CartItemEntity[];

  @Column({ default: 0, name: 'total_price'})
  totalPrice: number;
}