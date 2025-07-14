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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @ApiOperation({ summary: 'Get all events with optional filters' })
  @ApiResponse({ status: 200, description: 'Return all events' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ) {
    return this.eventsService.findAll({ category, startDate, endDate });
  }

  @ApiOperation({ summary: 'Get event by ID' })
  @ApiResponse({ status: 200, description: 'Return event by ID' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update event' })
  @ApiResponse({ status: 200, description: 'Event updated successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @ApiOperation({ summary: 'Delete event' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @ApiOperation({ summary: 'Find events nearby' })
  @ApiResponse({ status: 200, description: 'Return nearby events' })
  @ApiQuery({ name: 'latitude', required: true, type: Number })
  @ApiQuery({ name: 'longitude', required: true, type: Number })
  @ApiQuery({ name: 'radiusKm', required: false, type: Number })
  @Get('search/nearby')
  findNearby(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radiusKm') radiusKm?: number,
  ) {
    return this.eventsService.findNearby(latitude, longitude, radiusKm);
  }

  @ApiOperation({ summary: 'Mark interest in event' })
  @ApiResponse({ status: 200, description: 'Interest marked successfully' })
  @Post(':id/interested')
  markInterested(@Param('id') id: string) {
    return this.eventsService.markInterested(id);
  }

  @ApiOperation({ summary: 'Mark attendance for event' })
  @ApiResponse({ status: 200, description: 'Attendance marked successfully' })
  @Post(':id/attending')
  markAttending(@Param('id') id: string) {
    return this.eventsService.markAttending(id);
  }

  @ApiOperation({ summary: 'Increment event shares' })
  @ApiResponse({ status: 200, description: 'Shares incremented' })
  @Post(':id/share')
  incrementShares(@Param('id') id: string) {
    return this.eventsService.incrementShares(id);
  }
} 