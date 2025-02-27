import { CategoryEntity } from "../../../modules/category/entities/category.entity";
import { AbstractEntity } from "../../../database/abstract-entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity({name: 'products'})
export class ProductEntity extends AbstractEntity<ProductEntity>{
  @Column()
  name: string;
  
  @Column()
  description: string;

  @Column()
  images: string;

  @Column()
  price: number;

  @ManyToMany(()=>CategoryEntity, {onDelete: 'CASCADE'})
  @JoinTable({name: "product_category"})
  categories: CategoryEntity[];

  @CreateDateColumn({name: 'created_date'})
  createdDate: Date;

  @DeleteDateColumn({name: 'delete_at'})
  deleteAt: Date;
}