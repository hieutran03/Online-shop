import { QueryFilterDto } from "../../dtos/query-options.dto";

export class QueryByFilter{
  constructor(
    public readonly queryFilterDto: QueryFilterDto
  ){}
}