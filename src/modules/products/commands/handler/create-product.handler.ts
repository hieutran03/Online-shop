import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateProductCommand } from "../impl/create-product.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "../../entities/product.entity";

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand>{
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>
  ){}
  async execute({createProductDto}: CreateProductCommand): Promise<any> {
    const newProduct = new ProductEntity({
      ...createProductDto
    });

    const response = this.productRepository.save(newProduct);
    return response;
  }
}