import { DeleteProductCommand } from "../impl/delete-propduct.command";
import { UpdateProductCommand } from "../impl/update-product.command";
import { CreateProductHandler } from "./create-product.handler";

export const ProductCommandHandler = [CreateProductHandler, UpdateProductCommand, DeleteProductCommand]