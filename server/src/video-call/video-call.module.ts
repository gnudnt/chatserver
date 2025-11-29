import { Module } from '@nestjs/common';
import { VideoCallService } from './video-call.service';
import { VideoCallController } from './video-call.controller';

@Module({
  controllers: [VideoCallController],
  providers: [VideoCallService],
})
export class VideoCallModule {}
