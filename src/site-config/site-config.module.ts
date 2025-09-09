import { Module } from '@nestjs/common';
import { SiteConfigService } from './site-config.service';
import { CompanyController } from './site-config.controller';
import { SiteConfigRepository } from './site-config.repository';

@Module({
  controllers: [CompanyController],
  providers: [SiteConfigService, SiteConfigRepository],
})
export class SiteConfigModule {}
