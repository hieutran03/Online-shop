import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ForgotPasswordEvent } from '../impl/forgot-password.event';
import { ProducerService } from 'src/modules/queue/services/producer.service';

@EventsHandler(ForgotPasswordEvent)
export class ForgotPasswordHander implements IEventHandler<ForgotPasswordEvent>{
  constructor(private readonly producerService: ProducerService) {}
  
  handle({ email }: ForgotPasswordEvent) {
    console.log('Forgot password event');
    this.producerService.addToEmailQueue(email);
  }
}
