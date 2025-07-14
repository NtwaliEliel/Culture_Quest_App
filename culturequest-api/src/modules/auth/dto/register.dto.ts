import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'user', required: false })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiProperty({ example: ['English', 'French'], required: false })
  @IsString({ each: true })
  @IsOptional()
  languages?: string[];

  @ApiProperty({ example: 'Kigali', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 'Rwanda', required: false })
  @IsString()
  @IsOptional()
  country?: string;
} 