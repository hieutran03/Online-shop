import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { MailException } from 'src/common/exceptions/mail.exeption';
import { EmailInterface } from 'src/common/interfaces/email.interface';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;
  constructor(private readonly configService: ConfigService) {
    const connection = amqp.connect(['amqps://beocynid:2u8ZbjgZUjH2uSurQkc06rufJx_N2vAR@leopard.lmq.cloudamqp.com/beocynid']);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('emailQueue', { durable: true });
      },
    });
  }

  async addToEmailQueue(mail: EmailInterface) {
    try {
      console.log(mail)
      await this.channelWrapper.sendToQueue(
        'emailQueue',
        Buffer.from(JSON.stringify(mail)),
        {
          persistent: true,
        },
      );
      Logger.log('Sent To Queue');
    } catch (error) {
      throw new MailException();
    }
  }
}
