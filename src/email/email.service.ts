import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OtpService } from '../otp/otp.service';
import { EventPayloads } from '../event-emitter/interface/event-types.interface';

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

  @OnEvent('init.email')
  async employeeCreatedEmail(data: EventPayloads['init.email']) {
    const {
      tenant,
      email,
      firstName,
      lastName,
      employeeId,
      generatedPassword,
    } = data;

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
      template: './init-information',
      context: {
        firstName,
        lastName,
        email,
        otp: code,
        magicLink: `${process.env.ADMIN_TOOL_URL}/auth/${tenant.tenantSlug}/otp`,
        supportEmail: process.env.SUPPORT_EMAIL,
        companyName: process.env.COMPANY_NAME,
        year: new Date().getFullYear(),
        activationCode: code,
        generatedPassword,
        // otpTTLMinutes: process.env.OTP_TTL_MINUTES || 15,
      },
    });
  }
}
