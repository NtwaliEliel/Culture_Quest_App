import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsUrl, IsUUID } from 'class-validator';

export class CreateStoryDto {
  @ApiProperty({ example: 'The Origin of Intore Dance' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'oral_history' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'Long ago, in the kingdom of Rwanda...' })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({ example: 'https://storage.example.com/audio/story1.mp3' })
  @IsUrl()
  @IsOptional()
  audioUrl?: string;

  @ApiProperty({ example: 'https://storage.example.com/video/story1.mp4' })
  @IsUrl()
  @IsOptional()
  videoUrl?: string;

  @ApiProperty({ example: 'Transcription of the audio content...' })
  @IsString()
  @IsOptional()
  transcription?: string;

  @ApiProperty({ example: 'Kinyarwanda' })
  @IsString()
  language: string;

  @ApiProperty({ example: 'Northern Kinyarwanda' })
  @IsString()
  @IsOptional()
  dialect?: string;

  @ApiProperty({ example: 'Northern Province' })
  @IsString()
  @IsOptional()
  region?: string;

  @ApiProperty({ example: '19th Century' })
  @IsString()
  @IsOptional()
  period?: string;

  @ApiProperty({ example: 'Royal Court Traditions' })
  @IsString()
  @IsOptional()
  culturalContext?: string;

  @ApiProperty({ example: 'user-123' })
  @IsUUID()
  @IsOptional()
  narratorId?: string;

  @ApiProperty({ example: ['dance', 'tradition', 'royal-court'] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ example: ['story-123', 'story-456'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  relatedStories?: string[];
} 