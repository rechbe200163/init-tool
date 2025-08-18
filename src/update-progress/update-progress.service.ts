import { Injectable } from '@nestjs/common';
import { CreateUpdateProgressDto } from './dto/create-update-progress.dto';
import { UpdateUpdateProgressDto } from './dto/update-update-progress.dto';
import { TypedEventEmitter } from 'src/event-emitter/typed-event-emitter.class';

@Injectable()
export class UpdateProgressService {
  constructor(
    private readonly eventEmitter: TypedEventEmitter, // Assuming you have a TypedEventEmitter for event handling
  ) {}

  create(createUpdateProgressDto: CreateUpdateProgressDto) {
    return this.eventEmitter.emit('init.start', {
      email: createUpdateProgressDto.emailTo,
      initStatus: {
        progress: createUpdateProgressDto.progress,
        status: createUpdateProgressDto.status as
          | 'pending'
          | 'in_progress'
          | 'completed',
      },
    });
  }

  findAll() {
    return `This action returns all updateProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} updateProgress`;
  }

  update(id: number, updateUpdateProgressDto: UpdateUpdateProgressDto) {
    return `This action updates a #${id} updateProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} updateProgress`;
  }
}
