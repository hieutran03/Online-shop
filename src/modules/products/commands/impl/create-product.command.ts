import { CreateProductDto } from "../../dtos/create-product.dto";

export class CreateProductCommand{
  constructor(
    public readonly createProductDto: CreateProductDto
  ){}
}