import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'prisma/prisma.extension';
import { CreateAddressDto } from './dto/create-address.dto';

export class AddressRepository {
  constructor(
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  create(data: CreateAddressDto) {
    return this.prismaService.client.address.create({
      data,
    });
  }
}
