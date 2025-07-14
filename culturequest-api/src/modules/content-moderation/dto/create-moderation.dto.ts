import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateModerationDto {
  @ApiProperty({ example: 'story' })
  @IsString()
  contentType: string;

  @ApiProperty({ example: 'story-123' })
  @IsString()
  contentId: string;

  @ApiProperty({ example: 'pending' })
  @IsString()
  status: string;

  @ApiProperty({ example: 'user-123' })
  @IsUUID()
  moderatorId: string;

  @ApiProperty({ example: 'Content contains inappropriate language' })
  @IsString()
  notes: string;
} 