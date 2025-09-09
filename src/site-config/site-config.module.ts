import { Module } from '@nestjs/common';
import { SiteConfigService } from './site-config.service';
import { CompanyController } from './site-config.controller';

@Module({
  controllers: [CompanyController],
  providers: [SiteConfigService],
})
export class SiteConfigModule {}
