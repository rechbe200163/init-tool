import { Injectable } from '@nestjs/common';
import { CreateSiteConfigDto } from './dto/create-siteConfig.dto';

@Injectable()
export class SiteConfigService {
  create(createSiteConfigDto: CreateSiteConfigDto) {
    return createSiteConfigDto;
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
