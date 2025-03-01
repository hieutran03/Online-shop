import { AggregateRoot } from "@nestjs/cqrs";
import { UserRole } from "../entities/users.entity";
import { UserCreatedEvent } from "./impl/user-created.event";

export class UserModel extends AggregateRoot{
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly username: string,
    private readonly password: string,
    private readonly role: UserRole,
    private readonly email: string
  ){
    super()
  }

  getId(){
    return this.id;
  }

  getName(){
    return this.name;
  }

  getUsername(){
    return this.username;
  }

  getPassword(){
    return this.password;
  }

  getRole(){
    return this.role;
  }

  getEmail(){
    return this.email;
  }

  createUser(){
    this.apply(new UserCreatedEvent({
      email: this.email,
      subject: 'Welcome',
      html: `<h1>Welcome to Online Shop ${this.name}</h1>`
    }));
  }
}