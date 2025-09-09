import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { AddressRepository } from 'src/address/address.repository';

@Module({
  providers: [BillingService],
  exports: [BillingService],
  controllers: [BillingController],
})
export class BillingModule {}
