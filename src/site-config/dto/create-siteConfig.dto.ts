import { ApiProperty } from '@nestjs/swagger';
import {
  IsIBAN,
  IsPhoneNumber,
  IsString,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateSiteConfigDto {
  @ApiProperty({
    description: 'The name of the company for the site configuration',
    required: true,
    default: 'OrderLink GmbH',
  })
  @IsString()
  companyName: string;

  @ApiProperty({
    description: 'The email address for the site configuration',
    required: true,
    default: 'info@orderlink.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'The phone number for the site configuration',
    required: true,
    default: '+43 6759976531632',
  })
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({
    description: 'The IBAN for the site configuration',
    required: true,
    default: 'DE05593501101370793364',
  })
  @IsIBAN()
  iban: string;

  @ApiProperty({
    description: 'The company number for the site configuration',
    required: true,
    default: 'HRB 12345',
  })
  @IsString()
  companyNumber: string;

  @ApiProperty({
    description: 'The address ID for the site configuration',
    required: true,
    default: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  addressId: string;
}
