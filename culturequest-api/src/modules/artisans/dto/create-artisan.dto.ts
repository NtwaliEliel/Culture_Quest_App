import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsObject, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateArtisanDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Master Weaver' })
  @IsString()
  profession: string;

  @ApiProperty({ example: '123 Craft Street' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'Kigali' })
  @IsString()
  city: string;

  @ApiProperty({
    example: {
      latitude: -1.9441,
      longitude: 30.0619
    }
  })
  @IsObject()
  coordinates: Record<string, number>;

  @ApiProperty({
    example: {
      monday: '9:00-17:00',
      tuesday: '9:00-17:00',
      wednesday: '9:00-17:00',
      thursday: '9:00-17:00',
      friday: '9:00-17:00'
    }
  })
  @IsObject()
  workingHours: Record<string, string>;

  @ApiProperty({ example: 'Master craftsman specializing in traditional basket weaving' })
  @IsString()
  description: string;

  @ApiProperty({ example: ['Basket Weaving', 'Natural Dyes', 'Traditional Patterns'] })
  @IsArray()
  @IsString({ each: true })
  specialties: string[];

  @ApiProperty({
    example: [
      {
        url: 'https://example.com/image1.jpg',
        caption: 'Traditional basket weaving technique',
        type: 'image'
      }
    ]
  })
  @IsArray()
  @IsObject({ each: true })
  gallery: Record<string, any>[];

  @ApiProperty({ example: '+250700000000' })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '+250700000000' })
  @IsPhoneNumber()
  @IsOptional()
  whatsapp?: string;

  @ApiProperty({ example: 'phone' })
  @IsString()
  @IsOptional()
  preferredContact?: string;

  @ApiProperty({
    example: [
      {
        name: 'Traditional Basket',
        description: 'Hand-woven basket using local materials',
        price: 50.00,
        materials: ['Banana fiber', 'Natural dyes'],
        images: ['https://example.com/basket1.jpg']
      }
    ]
  })
  @IsArray()
  @IsObject({ each: true })
  crafts: Record<string, any>[];
} 