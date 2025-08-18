import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventPayloads } from 'src/event-emitter/interface/event-types.interface';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent('init.start')
  async initStartEmail(data: EventPayloads['init.start']) {
    const { email, initStatus } = data;
    console.log(
      `Sending email to ${email} with status: ${initStatus.status} and progress: ${initStatus.progress}`,
    );

    await this.mailerService.sendMail({
      to: email,
      template: './init-start',
      context: { status: initStatus.status, progress: initStatus.progress },
    });
  }
}
