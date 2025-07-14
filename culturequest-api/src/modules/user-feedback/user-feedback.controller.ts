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
import { UserFeedbackService } from './user-feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('feedback')
@Controller('feedback')
export class UserFeedbackController {
  constructor(private readonly userFeedbackService: UserFeedbackService) {}

  @ApiOperation({ summary: 'Create a new feedback' })
  @ApiResponse({ status: 201, description: 'Feedback created successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.userFeedbackService.create(createFeedbackDto);
  }

  @ApiOperation({ summary: 'Get all feedback with optional filters' })
  @ApiResponse({ status: 200, description: 'Return all feedback' })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'userId', required: false })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('type') type?: string,
    @Query('category') category?: string,
    @Query('status') status?: string,
    @Query('userId') userId?: string,
  ) {
    return this.userFeedbackService.findAll({ type, category, status, userId });
  }

  @ApiOperation({ summary: 'Get feedback by ID' })
  @ApiResponse({ status: 200, description: 'Return feedback by ID' })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userFeedbackService.findOne(id);
  }

  @ApiOperation({ summary: 'Update feedback' })
  @ApiResponse({ status: 200, description: 'Feedback updated successfully' })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return this.userFeedbackService.update(id, updateFeedbackDto);
  }

  @ApiOperation({ summary: 'Delete feedback' })
  @ApiResponse({ status: 200, description: 'Feedback deleted successfully' })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userFeedbackService.remove(id);
  }

  @ApiOperation({ summary: 'Update feedback status' })
  @ApiResponse({ status: 200, description: 'Feedback status updated successfully' })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.userFeedbackService.updateStatus(id, status);
  }

  @ApiOperation({ summary: 'Get feedback by user' })
  @ApiResponse({ status: 200, description: 'Return feedback by user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.userFeedbackService.findByUser(userId);
  }

  @ApiOperation({ summary: 'Get feedback statistics' })
  @ApiResponse({ status: 200, description: 'Return feedback statistics' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('stats/overview')
  getStats() {
    return this.userFeedbackService.getStats();
  }
} 