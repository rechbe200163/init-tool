import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SiteConfigModule } from './site-config/site-config.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [SiteConfigModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
