import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../impl/user-created.event";
import { ProducerService } from "src/modules/queue/services/producer.service";

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent>{
  constructor(
    private readonly producerService: ProducerService,
  ){}
  handle({email}: UserCreatedEvent) {
    console.log("New user is created");
    this.producerService.addToEmailQueue(email);
  }
}