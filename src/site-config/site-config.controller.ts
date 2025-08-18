import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SiteConfigService } from './site-config.service';
import { SiteConfigDto } from './dto/site-config.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { CreateSiteConfigDto } from './dto/create-siteConfig.dto';

@Controller('site-config')
export class SiteConfigController {
  constructor(private readonly siteConfigService: SiteConfigService) {}

  @Post()
  @ApiBody({ type: CreateSiteConfigDto })
  @ApiOkResponse({ type: SiteConfigDto })
  create(@Body() createSiteConfigDto: CreateSiteConfigDto) {
    return this.siteConfigService.create(createSiteConfigDto);
  }

  @Get()
  findAll() {
    return this.siteConfigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siteConfigService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteConfigService.remove(+id);
  }
}
