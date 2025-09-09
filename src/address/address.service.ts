import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressRepository } from './address.repository';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepo: AddressRepository) {}
  create(createAddressDto: CreateAddressDto) {
    return this.addressRepo.create(createAddressDto);
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
