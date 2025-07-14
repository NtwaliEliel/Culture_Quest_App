import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsObject, IsOptional } from 'class-validator';

export class CreateAnalyticsDto {
  @ApiProperty({ example: 'story_view' })
  @IsString()
  type: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  value: number;

  @ApiProperty({
    example: {
      storyId: 'story-123',
      userId: 'user-123',
      deviceType: 'mobile',
    },
  })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
} 