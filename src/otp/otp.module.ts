import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { TypedEventEmitterModule } from '../event-emitter/event-emitter.module';

@Module({
  providers: [OtpService, TypedEventEmitterModule],
  exports: [OtpService],
})
export class OtpModule {}
