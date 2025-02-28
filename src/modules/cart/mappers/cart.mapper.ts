import { IMapper } from "src/common/interfaces/mapper.interface";
import CartEntity from "../entities/cart.entity";
import CartModel from "../events/cart.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CartMapper implements IMapper<CartEntity, CartModel>{
  mapEntityToModel(entity: CartEntity): CartModel {
    return new CartModel(
      entity.id,
      entity.totalPrice,
      entity.cartItems
    ); 
  }
  mapModelToEntity(model: CartModel): CartEntity {
    return new CartEntity({
      id: model.getId(),
      totalPrice: model.getTotalPrice(),
      cartItems: model.getCartItems()
    });
  }
}