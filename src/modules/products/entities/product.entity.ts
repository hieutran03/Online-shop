import { AbstractEntity } from "../../../database/abstract-entity";
import { Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class ProductEntity extends AbstractEntity<ProductEntity>{
  @Column()
  name: string;
  
  @Column()
  description: string;

  @Column()
  images: string;

  @CreateDateColumn({name: 'created_date'})
  createdDate: string;

  @Column({default: false, nullable: true})
  deleted: boolean;
}