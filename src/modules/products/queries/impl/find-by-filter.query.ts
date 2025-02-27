import { QueryFilterDto } from "../../dtos/query-options.dto";

export class FindByFilterQuery{
  constructor(
    public readonly queryFilterDto: QueryFilterDto
  ){}
}