import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideoCallService } from './video-call.service';
import { CreateVideoCallDto } from './dto/create-video-call.dto';
import { UpdateVideoCallDto } from './dto/update-video-call.dto';

@Controller('video-call')
export class VideoCallController {
  constructor(private readonly videoCallService: VideoCallService) {}

  @Post()
  create(@Body() createVideoCallDto: CreateVideoCallDto) {
    return this.videoCallService.create(createVideoCallDto);
  }

  @Get()
  findAll() {
    return this.videoCallService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoCallService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoCallDto: UpdateVideoCallDto) {
    return this.videoCallService.update(+id, updateVideoCallDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoCallService.remove(+id);
  }
}
