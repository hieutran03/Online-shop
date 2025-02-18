import { IMapper } from "src/common/interfaces/mapper.interface";
import { UsersEntiy } from "./entities/users.entity";
import { UserModel } from "./events/user.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersMapper implements IMapper<UsersEntiy, UserModel>{
  mapModelToEntity(model: UserModel){
    return new UsersEntiy({
      id: model.getId(),
      name: model.getName(),
      username: model.getUsername(),
      password: model.getPassword(),
      email: model.getEmail()
    });
  }
  mapEntityToModel(entity: UsersEntiy){
    return new UserModel(
      entity.id,
      entity.name,
      entity.username,
      entity.password,
      entity.role,
      entity.email
    )
  } 
}