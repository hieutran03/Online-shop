import { IMapper } from "src/common/interfaces/mapper.interface";
import { ProductEntity } from "../entities/product.entity";
import { ProductModel } from "../events/product.model";

export class ProductMapper implements IMapper<ProductEntity, ProductModel>{
  mapEntityToModel(entity: ProductEntity): ProductModel {
    return new ProductModel(
      entity.id,
      entity.name,
      entity.description,
      entity.images,
      entity.price,
      entity.categories,
      entity.createdDate,
      entity.deleteAt
    )
  }

  mapModelToEntity(model: ProductModel): ProductEntity {
    return new ProductEntity({
      id: model.getId(),
      name: model.getName(),
      description: model.getDescription(),
      images: model.getImages(),
      price: model.getPrice(),
      categories: model.getCategories(),
      createdDate: model.getCreatedDate(),
      deleteAt: model.getDeleteAt()
    })
  }
}