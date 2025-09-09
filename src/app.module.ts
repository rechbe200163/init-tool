import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { EmailModule } from './email/email.module';
import { CustomPrismaModule } from 'nestjs-prisma';
import { ThrottlerModule } from '@nestjs/throttler';
import { BillingModule } from './billing/billing.module';
import { AddressModule } from './address/address.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { extendedPrismaClient } from 'prisma/prisma.extension';
import { SiteConfigModule } from './site-config/site-config.module';
import { UpdateProgressModule } from './update-progress/update-progress.module';

@Module({
  imports: [
    BillingModule,
    SiteConfigModule,
    AddressModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
