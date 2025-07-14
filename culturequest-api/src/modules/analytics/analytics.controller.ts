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
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @ApiOperation({ summary: 'Create a new analytics entry' })
  @ApiResponse({ status: 201, description: 'Analytics entry created successfully' })
  @Post()
  create(@Body() createAnalyticsDto: CreateAnalyticsDto) {
    return this.analyticsService.create(createAnalyticsDto);
  }

  @ApiOperation({ summary: 'Get all analytics entries with optional filters' })
  @ApiResponse({ status: 200, description: 'Return all analytics entries' })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  @Get()
  findAll(
    @Query('type') type?: string,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ) {
    return this.analyticsService.findAll({ type, startDate, endDate });
  }

  @ApiOperation({ summary: 'Get analytics entry by ID' })
  @ApiResponse({ status: 200, description: 'Return analytics entry by ID' })
  @ApiResponse({ status: 404, description: 'Analytics entry not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analyticsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update analytics entry' })
  @ApiResponse({ status: 200, description: 'Analytics entry updated successfully' })
  @ApiResponse({ status: 404, description: 'Analytics entry not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnalyticsDto: UpdateAnalyticsDto) {
    return this.analyticsService.update(id, updateAnalyticsDto);
  }

  @ApiOperation({ summary: 'Delete analytics entry' })
  @ApiResponse({ status: 200, description: 'Analytics entry deleted successfully' })
  @ApiResponse({ status: 404, description: 'Analytics entry not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analyticsService.remove(id);
  }

  @ApiOperation({ summary: 'Get aggregated statistics' })
  @ApiResponse({ status: 200, description: 'Return aggregated statistics' })
  @ApiQuery({ name: 'type', required: true })
  @ApiQuery({ name: 'startDate', required: true, type: Date })
  @ApiQuery({ name: 'endDate', required: true, type: Date })
  @Get('stats/aggregated')
  getAggregatedStats(
    @Query('type') type: string,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return this.analyticsService.getAggregatedStats(type, startDate, endDate);
  }

  @ApiOperation({ summary: 'Get top content' })
  @ApiResponse({ status: 200, description: 'Return top content' })
  @ApiQuery({ name: 'type', required: true })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Get('stats/top-content')
  getTopContent(
    @Query('type') type: string,
    @Query('limit') limit?: number,
  ) {
    return this.analyticsService.getTopContent(type, limit);
  }

  @ApiOperation({ summary: 'Get trends' })
  @ApiResponse({ status: 200, description: 'Return trends' })
  @ApiQuery({ name: 'type', required: true })
  @ApiQuery({ name: 'days', required: false, type: Number })
  @Get('stats/trends')
  getTrends(
    @Query('type') type: string,
    @Query('days') days?: number,
  ) {
    return this.analyticsService.getTrends(type, days);
  }
} 