import { PartialType } from '@nestjs/swagger';
import { CreateUpdateProgressDto } from './create-update-progress.dto';

export class UpdateUpdateProgressDto extends PartialType(CreateUpdateProgressDto) {}
