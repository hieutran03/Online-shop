import { AggregateRoot } from "@nestjs/cqrs";
import { UserRole } from "../entities/users.entity";
import { UserCreatedEvent } from "./impl/user-created.event";
import { ForgotPasswordEvent } from "./impl/forgot-password.event";

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

  changePassword(newPassword: string){
    console.log(newPassword)
    this.apply(new ForgotPasswordEvent({
      email: this.email,
      subject: 'Forgot Password',
      html: `<h1>Your new password: ${newPassword}</h1>`
    }))
  }
}