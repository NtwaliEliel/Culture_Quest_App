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
import { ContentModerationService } from './content-moderation.service';
import { CreateModerationDto } from './dto/create-moderation.dto';
import { UpdateModerationDto } from './dto/update-moderation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('moderation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('moderation')
export class ContentModerationController {
  constructor(private readonly contentModerationService: ContentModerationService) {}

  @ApiOperation({ summary: 'Create a new moderation entry' })
  @ApiResponse({ status: 201, description: 'Moderation entry created successfully' })
  @Post()
  create(@Body() createModerationDto: CreateModerationDto) {
    return this.contentModerationService.create(createModerationDto);
  }

  @ApiOperation({ summary: 'Get all moderation entries with optional filters' })
  @ApiResponse({ status: 200, description: 'Return all moderation entries' })
  @ApiQuery({ name: 'contentType', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'moderatorId', required: false })
  @Get()
  findAll(
    @Query('contentType') contentType?: string,
    @Query('status') status?: string,
    @Query('moderatorId') moderatorId?: string,
  ) {
    return this.contentModerationService.findAll({ contentType, status, moderatorId });
  }

  @ApiOperation({ summary: 'Get moderation entry by ID' })
  @ApiResponse({ status: 200, description: 'Return moderation entry by ID' })
  @ApiResponse({ status: 404, description: 'Moderation entry not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentModerationService.findOne(id);
  }

  @ApiOperation({ summary: 'Update moderation entry' })
  @ApiResponse({ status: 200, description: 'Moderation entry updated successfully' })
  @ApiResponse({ status: 404, description: 'Moderation entry not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModerationDto: UpdateModerationDto) {
    return this.contentModerationService.update(id, updateModerationDto);
  }

  @ApiOperation({ summary: 'Delete moderation entry' })
  @ApiResponse({ status: 200, description: 'Moderation entry deleted successfully' })
  @ApiResponse({ status: 404, description: 'Moderation entry not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentModerationService.remove(id);
  }

  @ApiOperation({ summary: 'Get moderation entries by content' })
  @ApiResponse({ status: 200, description: 'Return moderation entries for content' })
  @Get('content/:type/:id')
  findByContent(
    @Param('type') contentType: string,
    @Param('id') contentId: string,
  ) {
    return this.contentModerationService.findByContent(contentType, contentId);
  }

  @ApiOperation({ summary: 'Get moderation entries by moderator' })
  @ApiResponse({ status: 200, description: 'Return moderation entries by moderator' })
  @Get('moderator/:id')
  findByModerator(@Param('id') moderatorId: string) {
    return this.contentModerationService.findByModerator(moderatorId);
  }
} 