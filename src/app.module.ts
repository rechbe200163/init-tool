import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { EmailModule } from './email/email.module';
import { CustomPrismaModule } from 'nestjs-prisma';
import { ThrottlerModule } from '@nestjs/throttler';
import { BillingModule } from './billing/billing.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { extendedPrismaClient } from 'prisma/prisma.extension';
import { UpdateProgressModule } from './update-progress/update-progress.module';
import { OtpModule } from './otp/otp.module';
import { OnboardingsModule } from './onboardings/onboardings.module';

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useFactory: () => {
        return extendedPrismaClient;
      },
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // milliseconds
          limit: 10, // requests per ttl
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService globally available
      envFilePath: '.env', // Default
    }),
    EventEmitterModule.forRoot(),
    UpdateProgressModule,
    EmailModule,
    OtpModule,
    OnboardingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
