import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ArtisansService } from './artisans.service';
import { CreateArtisanDto } from './dto/create-artisan.dto';
import { UpdateArtisanDto } from './dto/update-artisan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('artisans')
@Controller('artisans')
export class ArtisansController {
  constructor(private readonly artisansService: ArtisansService) {}

  @ApiOperation({ summary: 'Create a new artisan' })
  @ApiResponse({ status: 201, description: 'Artisan created successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createArtisanDto: CreateArtisanDto) {
    return this.artisansService.create(createArtisanDto);
  }

  @ApiOperation({ summary: 'Get all artisans with optional filters' })
  @ApiResponse({ status: 200, description: 'Return all artisans' })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'specialties', required: false, isArray: true })
  @ApiQuery({ name: 'profession', required: false })
  @Get()
  findAll(
    @Query('city') city?: string,
    @Query('specialties') specialties?: string[],
    @Query('profession') profession?: string,
  ) {
    return this.artisansService.findAll({ city, specialties, profession });
  }

  @ApiOperation({ summary: 'Get artisan by ID' })
  @ApiResponse({ status: 200, description: 'Return artisan by ID' })
  @ApiResponse({ status: 404, description: 'Artisan not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artisansService.findOne(id);
  }

  @ApiOperation({ summary: 'Update artisan' })
  @ApiResponse({ status: 200, description: 'Artisan updated successfully' })
  @ApiResponse({ status: 404, description: 'Artisan not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtisanDto: UpdateArtisanDto) {
    return this.artisansService.update(id, updateArtisanDto);
  }

  @ApiOperation({ summary: 'Delete artisan' })
  @ApiResponse({ status: 200, description: 'Artisan deleted successfully' })
  @ApiResponse({ status: 404, description: 'Artisan not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artisansService.remove(id);
  }

  @ApiOperation({ summary: 'Find artisans nearby' })
  @ApiResponse({ status: 200, description: 'Return nearby artisans' })
  @ApiQuery({ name: 'latitude', required: true, type: Number })
  @ApiQuery({ name: 'longitude', required: true, type: Number })
  @ApiQuery({ name: 'radiusKm', required: false, type: Number })
  @Get('search/nearby')
  findNearby(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radiusKm') radiusKm?: number,
  ) {
    return this.artisansService.findNearby(latitude, longitude, radiusKm);
  }

  @ApiOperation({ summary: 'Verify artisan' })
  @ApiResponse({ status: 200, description: 'Artisan verified successfully' })
  @ApiResponse({ status: 404, description: 'Artisan not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/verify')
  verifyArtisan(@Param('id') id: string, @Body('verifierId') verifierId: string) {
    return this.artisansService.verifyArtisan(id, verifierId);
  }

  @ApiOperation({ summary: 'Increment artisan contact count' })
  @ApiResponse({ status: 200, description: 'Contact count incremented' })
  @Post(':id/contact')
  incrementContactCount(@Param('id') id: string) {
    return this.artisansService.incrementContactCount(id);
  }
} 