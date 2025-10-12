import { Module } from '@nestjs/common';
import { OnboardingsService } from './onboardings.service';
import { OnboardingsController } from './onboardings.controller';
import { TypedEventEmitterModule } from '../event-emitter/event-emitter.module';
@Module({
  imports: [TypedEventEmitterModule],
  controllers: [OnboardingsController],
  providers: [OnboardingsService],
})
export class OnboardingsModule {}
