import { Test, TestingModule } from '@nestjs/testing';
import { VideoCallController } from './video-call.controller';
import { VideoCallService } from './video-call.service';

describe('VideoCallController', () => {
  let controller: VideoCallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoCallController],
      providers: [VideoCallService],
    }).compile();

    controller = module.get<VideoCallController>(VideoCallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
