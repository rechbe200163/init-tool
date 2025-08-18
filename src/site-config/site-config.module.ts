import { Module } from '@nestjs/common';
import { SiteConfigService } from './site-config.service';
import { SiteConfigController } from './site-config.controller';

@Module({
  controllers: [SiteConfigController],
  providers: [SiteConfigService],
})
export class SiteConfigModule {}
