import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SiteConfigModule } from './site-config/site-config.module';
import { AddressModule } from './address/address.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from 'prisma/prisma.extension';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UpdateProgressModule } from './update-progress/update-progress.module';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
