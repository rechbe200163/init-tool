import { EventEmitterModule } from '@nestjs/event-emitter';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotImplementedException,
} from '@nestjs/common';
import { UpdateProgressService } from './update-progress.service';
import { CreateUpdateProgressDto } from './dto/create-update-progress.dto';
import { UpdateUpdateProgressDto } from './dto/update-update-progress.dto';

@Controller('update-progress')
export class UpdateProgressController {
  constructor(private readonly updateProgressService: UpdateProgressService) {}

  @Post()
  create(@Body() createUpdateProgressDto: CreateUpdateProgressDto) {
    // return this.updateProgressService.create(createUpdateProgressDto);
    return new NotImplementedException();
  }

  @Get()
  findAll() {
    // return this.updateProgressService.findAll();
    return new NotImplementedException();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.updateProgressService.findOne(+id);
    return new NotImplementedException();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUpdateProgressDto: UpdateUpdateProgressDto,
  ) {
    // return this.updateProgressService.update(+id, updateUpdateProgressDto);
    return new NotImplementedException();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.updateProgressService.remove(+id);
    return new NotImplementedException();
  }
}
