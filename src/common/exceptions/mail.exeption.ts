import { HttpException, HttpStatus } from "@nestjs/common";

export class MailException extends HttpException {
  constructor() {
    super('Error sending email', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}