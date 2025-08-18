import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateUpdateProgressDto {
  @ApiProperty({
    description: 'Email address to send updates to',
    example: 'user@example.com',
  })
  @IsEmail()
  emailTo: string;

  @ApiProperty({
    description: 'Status of the update progress',
    example: 'in-progress',
  })
  @IsString()
  status: string;

  @ApiProperty({ minimum: 0, maximum: 100 })
  @IsInt()
  progress: number;
}
