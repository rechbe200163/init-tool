import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'prisma/prisma.extension';
import { CreateSiteConfigDto } from './dto/create-siteConfig.dto';

export class SiteConfigRepository {
  constructor(
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  create(data: CreateSiteConfigDto) {
    return this.prismaService.client.siteConfig.create({
      data,
    });
  }
}
