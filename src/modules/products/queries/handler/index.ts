import { FindByFilterHandler } from "./find-by-filter.handler";
import { FindByIdHandler } from "./find-by-id.handler";

export const ProductQueryHandler = [FindByFilterHandler, FindByIdHandler]