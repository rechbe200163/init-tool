import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AddressDto } from 'src/address/dto/address.dto';

export class SiteConfigDto {
  @Expose()
  siteConfigId: string;
  @Expose()
  companyName: string;
  @Expose()
  logoPath: string;
  @Expose()
  email: string;
  @Expose()
  phoneNumber: string;
  @Expose()
  iban: string;
  @Expose()
  companyNumber: string;
  @Expose({
    name: 'createdAt',
    toPlainOnly: true,
  })
  createdAt: Date | null;
  @Expose({
    name: 'modifiedAt',
    toPlainOnly: true,
  })
  modifiedAt: Date | null;
  @Expose()
  tenantId: string;
  @Expose()
  deliveryNavigationToolBackendURL: string;
  @Expose()
  deliveryNavigationToolConnected: boolean;
  @Expose()
  deleted: boolean;
  @Expose()
  address: AddressDto;
}
