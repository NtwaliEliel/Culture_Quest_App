import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber, Min, Max } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({ example: 'user-123' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'bug_report' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'app_crash' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'App crashes when uploading large images' })
  @IsString()
  description: string;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @Min(1)
  @Max(5)
  priority: number;
} 