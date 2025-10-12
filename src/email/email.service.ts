import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OtpService } from '../otp/otp.service';
import { EventPayloads } from '../event-emitter/interface/event-types.interface';
import { Resend } from 'resend';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

type TemplateContext = Record<
  string,
  string | number | boolean | null | undefined
>;

@Injectable()
export class EmailService {
  constructor(
    private readonly resend: Resend,
    private readonly OtpService: OtpService,
  ) {
    this.fromEmail = process.env.RESEND_FROM_EMAIL ?? '';

    if (!this.fromEmail) {
      throw new Error('RESEND_FROM_EMAIL is not set');
    }
  }

  private readonly logger = new Logger(EmailService.name);
  private readonly templateCache = new Map<string, string>();

  // Dynamisch: funktioniert in dist und src
  private readonly templatesDir = join(__dirname, 'templates');

  private readonly fromEmail: string;

  @OnEvent('init.start')
  async initStartEmail(data: EventPayloads['init.start']) {
    const { email, initStatus } = data;

    this.logger.debug(
      `Sending init.start email to ${email} with status ${initStatus.status} (${initStatus.progress}%)`,
    );

    await this.sendEmail({
      to: email,
      subject: 'Fortschritt Ihrer OrderLink Einrichtung',
      template: 'init-start',
      context: {
        status: initStatus.status,
        progress: initStatus.progress,
        companyName: process.env.COMPANY_NAME ?? 'OrderLink',
        year: new Date().getFullYear(),
      },
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

    this.logger.debug(
      `Sending init.email to ${email} for tenant ${tenant.tenantSlug}`,
    );

    const { code } = await this.OtpService.createOTP(
      tenant.tenantId,
      employeeId,
    );

    await this.sendEmail({
      to: email,
      subject: 'Ihr Zugang zu OrderLink',
      template: 'init-information',
      context: {
        firstName,
        lastName,
        magicLink: `${process.env.ADMIN_TOOL_URL}/auth/${tenant.tenantSlug}/otp`,
        supportEmail: process.env.SUPPORT_EMAIL ?? this.fromEmail,
        companyName: process.env.COMPANY_NAME ?? 'OrderLink',
        year: new Date().getFullYear(),
        activationCode: code,
        generatedPassword: generatedPassword ?? '',
      },
    });
  }

  private async sendEmail(options: {
    to: string;
    subject: string;
    template: string;
    context: TemplateContext;
  }): Promise<void> {
    const html = await this.renderTemplate(options.template, options.context);

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: options.to,
        subject: options.subject,
        html,
      });
    } catch (error) {
      this.logger.error(
        `Failed to send ${options.template} email to ${options.to}`,
        (error as Error)?.stack,
      );
      throw error;
    }
  }

  private async renderTemplate(
    templateName: string,
    context: TemplateContext,
  ): Promise<string> {
    const template = await this.loadTemplate(templateName);

    return template.replace(/{{\s*(\w+)\s*}}/g, (_, key: string) => {
      const value = context[key];
      return value === undefined || value === null ? '' : String(value);
    });
  }

  private async loadTemplate(templateName: string): Promise<string> {
    const cached = this.templateCache.get(templateName);

    if (cached) {
      return cached;
    }

    const templatePath = join(this.templatesDir, `${templateName}.html`);
    const file = await readFile(templatePath, 'utf-8');

    this.templateCache.set(templateName, file);

    return file;
  }
}
