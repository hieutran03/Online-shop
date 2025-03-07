import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailException } from 'src/common/exceptions/mail.exeption';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}
  async sendEmail(options: { email: string, subject: string, html: string}) {
    try {
      const message = {
        to: options.email,
        subject: options.subject,
        html: options.html
      };
      const emailSend = await this.mailerService.sendMail({
        ...message,
      });
      return emailSend;
    } catch (error) {
      throw new MailException();
    }
  }
}