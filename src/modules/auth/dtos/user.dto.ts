import { Exclude, Expose } from "class-transformer";
import CartEntity from "src/modules/cart/entities/cart.entity";
@Exclude()
export class UserDto {

  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  username: string;
  @Expose()
  role: string;
  @Expose()
  cart: CartEntity;
  
}
