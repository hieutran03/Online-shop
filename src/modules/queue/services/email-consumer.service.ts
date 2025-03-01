import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { EmailService } from 'src/modules/email/services/email.service';

@Injectable()
export class EmailConsumerService implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  private readonly logger = new Logger(EmailConsumerService.name);
  constructor(private emailService: EmailService) {
    const connection = amqp.connect(['amqps://beocynid:2u8ZbjgZUjH2uSurQkc06rufJx_N2vAR@leopard.lmq.cloudamqp.com/beocynid']);
    this.channelWrapper = connection.createChannel();
  }

  public async onModuleInit() {
    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        await channel.assertQueue('emailQueue', { durable: true });
        await channel.consume('emailQueue', async (message) => {
          if (message) {
            const content = JSON.parse(message.content.toString());
            this.logger.log('Received message:', content);
            await this.emailService.sendEmail(content);
            channel.ack(message);
          }
        });
      });
      this.logger.log('Consumer service started and listening for messages.');
    } catch (err) {
      this.logger.error('Error starting the consumer:', err);
    }
  }
}