import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateProductCommand } from "../impl/create-product.command";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ProductEntity } from "../../entities/product.entity";
import { CategoryEntity } from "src/modules/category/entities/category.entity";

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand>{
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)private readonly categoryRepository: Repository<CategoryEntity>
  ){}
  async execute({createProductDto}: CreateProductCommand): Promise<any> {
    const categories = await this.categoryRepository.find({where: {id: In(createProductDto.categories)}})
    const newProduct = new ProductEntity({
      ...createProductDto,
      categories
    });

    const response = this.productRepository.save(newProduct);
    return response;
  }
}