import { Module } from '@nestjs/common';
import { ProducerService } from './services/producer.service';
import { EmailConsumerService } from './services/email-consumer.service';

@Module({
  providers: [ProducerService, EmailConsumerService],
  exports: [ProducerService],
})
export class QueueModule {}