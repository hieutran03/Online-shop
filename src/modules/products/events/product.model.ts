import { CategoryEntity } from "src/modules/category/entities/category.entity";

export class ProductModel{
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly description: string,
    private readonly images: string,
    private readonly price: number,
    private readonly categories: CategoryEntity[],
    private readonly createdDate: Date,
    private readonly deleteAt: Date
  ){}

  getId(){
    return this.id;
  }

  getName(){
    return this.name;
  }

  getDescription(){
    return this.description;
  }

  getImages(){
    return this.images;
  }

  getPrice(){
    return this.price;
  }

  getCategories(){
    return this.categories;
  }

  getCreatedDate(){
    return this.createdDate
  }

  getDeleteAt(){
    return this.deleteAt;
  }
}