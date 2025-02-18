export interface IMapper<TEntity, TModel>{
  mapModelToEntity(model: TModel): TEntity;
  mapEntityToModel(entity: TEntity): TModel;
}