import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ type: String, required: true, default: 'Stubenberg' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ type: String, required: true, default: 'Österreich' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ type: String, required: true, default: '8223' })
  @IsString()
  @IsNotEmpty()
  postCode: string;

  @ApiProperty({ type: String, required: true, default: 'Steiermark' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ type: String, required: true, default: 'Stubenberg' })
  @IsString()
  @IsNotEmpty()
  streetName: string;

  @ApiProperty({ type: String, required: true, default: '1' })
  @IsString()
  @IsNotEmpty()
  streetNumber: string;
}
