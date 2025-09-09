import { Injectable } from '@nestjs/common';
import { CreateSiteConfigDto } from './dto/create-siteConfig.dto';
import { SiteConfigRepository } from './site-config.repository';

@Injectable()
export class SiteConfigService {
  constructor(private readonly siteConfigRepo: SiteConfigRepository) {}

  create(createSiteConfigDto: CreateSiteConfigDto) {
    return this.siteConfigRepo.create(createSiteConfigDto);
  }

  findAll() {
    return `This action returns all siteConfig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} siteConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} siteConfig`;
  }
}
