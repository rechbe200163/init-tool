import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventPayloads } from 'src/event-emitter/interface/event-types.interface';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly OtpService: OtpService,
  ) {}

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
  @OnEvent('employee.created')
  async employeeCreatedEmail(data: EventPayloads['employee.created']) {
    const { tenant, email, firstName, lastName, employeeId } = data;

    console.log(
      `Sending employee created email to ${email} with firstName: ${firstName}`,
      `with lastName: ${lastName}`,
    );

    const { code } = await this.OtpService.createOTP(
      tenant.tenantId,
      employeeId,
    );

    await this.mailerService.sendMail({
      to: email,
      template: './employee-created',
      context: {
        firstName,
        lastName,
        email,
        otp: code,
        magicLink: `https://admin.orderlink.at/auth/${tenant.tenantSlug}/otp`,
      },
    });
  }
}
