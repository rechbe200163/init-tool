import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { OtpModule } from '../otp/otp.module';
import { Resend } from 'resend';

@Module({
  imports: [OtpModule],
  controllers: [EmailController],
  providers: [
    EmailService,
    {
      provide: Resend,
      useFactory: () => {
        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey) {
          throw new Error('RESEND_API_KEY is not set');
        }

        return new Resend(apiKey);
      },
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
