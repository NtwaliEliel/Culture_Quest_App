import { Module } from '@nestjs/common';
import { ContentModerationService } from './content-moderation.service';
import { ContentModerationController } from './content-moderation.controller';

@Module({
  controllers: [ContentModerationController],
  providers: [ContentModerationService],
  exports: [ContentModerationService],
})
export class ContentModerationModule {} 