import { Module } from '@nestjs/common';
import { UpdateProgressService } from './update-progress.service';
import { UpdateProgressController } from './update-progress.controller';
import { TypedEventEmitterModule } from 'src/event-emitter/event-emitter.module';

@Module({
  imports: [TypedEventEmitterModule],
  controllers: [UpdateProgressController],
  providers: [UpdateProgressService],
})
export class UpdateProgressModule {}
