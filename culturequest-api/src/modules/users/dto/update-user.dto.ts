import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsArray, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  languages?: string[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  timezone?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  notificationsEnabled?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  offlineAccessEnabled?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  preferredLanguage?: string;
} 