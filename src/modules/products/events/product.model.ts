export class ProductModel{
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly description: string,
    private readonly images: string,
    private readonly createdDate: string,
    private readonly deleted: boolean
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

  getCreatedDate(){
    return this.createdDate
  }

  getDeleted(){
    return this.deleted;
  }
}