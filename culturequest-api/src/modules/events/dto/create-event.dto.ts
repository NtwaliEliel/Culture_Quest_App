import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsObject, IsNumber, IsDateString, IsUrl } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Umuganura Harvest Festival' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Annual celebration of harvest and cultural heritage' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Rebero Cultural Center' })
  @IsString()
  venue: string;

  @ApiProperty({ example: 'KG 123 St, Rebero Hill' })
  @IsString()
  address: string;

  @ApiProperty({
    example: {
      latitude: -1.9441,
      longitude: 30.0619
    }
  })
  @IsObject()
  coordinates: Record<string, number>;

  @ApiProperty({ example: 'Take the KN5 Road towards Rebero Hill...' })
  @IsString()
  @IsOptional()
  accessInstructions?: string;

  @ApiProperty({ example: '2024-08-01T09:00:00Z' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2024-08-01T17:00:00Z' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: 'Africa/Kigali' })
  @IsString()
  timezone: string;

  @ApiProperty({
    example: [
      {
        title: 'Opening Ceremony',
        startTime: '09:00',
        endTime: '10:00',
        description: 'Traditional welcome and blessings'
      }
    ]
  })
  @IsArray()
  @IsObject({ each: true })
  sessions: Record<string, any>[];

  @ApiProperty({ example: 'festival' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'One of Rwanda\'s most important traditional celebrations' })
  @IsString()
  @IsOptional()
  culturalSignificance?: string;

  @ApiProperty({ example: 500 })
  @IsNumber()
  @IsOptional()
  capacity?: number;

  @ApiProperty({ example: ['https://example.com/image1.jpg'] })
  @IsArray()
  @IsUrl({}, { each: true })
  images: string[];

  @ApiProperty({ example: ['https://example.com/video1.mp4'] })
  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  videos?: string[];

  @ApiProperty({ example: 'https://example.com/brochure.pdf' })
  @IsUrl()
  @IsOptional()
  brochureUrl?: string;

  @ApiProperty({ example: ['artisan-1', 'artisan-2'] })
  @IsArray()
  @IsString({ each: true })
  artisanIds: string[];
} 