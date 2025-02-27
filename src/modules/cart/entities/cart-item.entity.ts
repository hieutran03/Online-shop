import { ProductEntity } from "../../products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import CartEntity from "./cart.entity";

@Entity({ name: 'cart_item' })
export class CartItemEntity{
  constructor(entity: Partial<CartItemEntity>) {
    Object.assign(this, entity);
  }

  @PrimaryColumn({name: 'cart_id'})
  cartId: number;
  
  @PrimaryColumn({name: 'product_id'})
  productId: number;
  
  @ManyToOne(() => CartEntity, cart => cart.cartItems, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({name: 'cart_id'})
  cart: CartEntity;

  @ManyToOne(() => ProductEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({name: 'product_id'})
  product: ProductEntity;

  @Column()
  quantity: number;
}