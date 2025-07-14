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
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('stories')
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @ApiOperation({ summary: 'Create a new story' })
  @ApiResponse({ status: 201, description: 'Story created successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStoryDto: CreateStoryDto) {
    return this.storiesService.create(createStoryDto);
  }

  @ApiOperation({ summary: 'Get all stories with optional filters' })
  @ApiResponse({ status: 200, description: 'Return all stories' })
  @ApiQuery({ name: 'language', required: false })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'tags', required: false, isArray: true })
  @ApiQuery({ name: 'region', required: false })
  @Get()
  findAll(
    @Query('language') language?: string,
    @Query('type') type?: string,
    @Query('tags') tags?: string[],
    @Query('region') region?: string,
  ) {
    return this.storiesService.findAll({ language, type, tags, region });
  }

  @ApiOperation({ summary: 'Get story by ID' })
  @ApiResponse({ status: 200, description: 'Return story by ID' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storiesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update story' })
  @ApiResponse({ status: 200, description: 'Story updated successfully' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storiesService.update(id, updateStoryDto);
  }

  @ApiOperation({ summary: 'Delete story' })
  @ApiResponse({ status: 200, description: 'Story deleted successfully' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storiesService.remove(id);
  }

  @ApiOperation({ summary: 'Verify story' })
  @ApiResponse({ status: 200, description: 'Story verified successfully' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/verify')
  verifyStory(
    @Param('id') id: string,
    @Body('verifierId') verifierId: string,
    @Body('verificationNotes') verificationNotes?: string,
  ) {
    return this.storiesService.verifyStory(id, verifierId, verificationNotes);
  }

  @ApiOperation({ summary: 'Increment story downloads' })
  @ApiResponse({ status: 200, description: 'Downloads incremented' })
  @Post(':id/download')
  incrementDownloads(@Param('id') id: string) {
    return this.storiesService.incrementDownloads(id);
  }

  @ApiOperation({ summary: 'Increment story shares' })
  @ApiResponse({ status: 200, description: 'Shares incremented' })
  @Post(':id/share')
  incrementShares(@Param('id') id: string) {
    return this.storiesService.incrementShares(id);
  }

  @ApiOperation({ summary: 'Search stories' })
  @ApiResponse({ status: 200, description: 'Return matching stories' })
  @ApiQuery({ name: 'query', required: true })
  @Get('search/text')
  search(@Query('query') query: string) {
    return this.storiesService.search(query);
  }
} 