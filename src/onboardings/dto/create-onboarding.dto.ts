import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSiteConfigOnboardingDto } from './create-siteConfig-onboarding.dto';
import { CreateAddressDto } from './create-address.dto';

export class CreateOnboardingDto {
  @ApiProperty({ type: CreateSiteConfigOnboardingDto })
  @ValidateNested()
  @Type(() => CreateSiteConfigOnboardingDto)
  siteConfig: CreateSiteConfigOnboardingDto;

  @ApiProperty({ type: CreateAddressDto })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
