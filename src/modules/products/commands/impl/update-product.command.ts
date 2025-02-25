import { UpdateProductDto } from "../../dtos/update-product.dto";

export class UpdateProductCommand{
  constructor(
    public readonly productId: number,
    public readonly updateProductDto: UpdateProductDto
  ){}
}