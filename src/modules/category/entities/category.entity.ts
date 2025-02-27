import { AbstractEntity } from "../../../database/abstract-entity";
import { ProductEntity } from "../../../modules/products/entities/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany } from "typeorm";

@Entity({name: 'categories'})
export class CategoryEntity extends AbstractEntity<CategoryEntity>{
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(()=>ProductEntity,{onDelete: 'CASCADE'})
  products: ProductEntity[]

  @CreateDateColumn({name: 'created_date'})
  createdDate: Date
  
  @DeleteDateColumn({name: 'delete_at'})
  deleteAt: Date;
}