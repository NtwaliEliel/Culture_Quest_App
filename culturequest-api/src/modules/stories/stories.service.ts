import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class StoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createStoryDto: CreateStoryDto) {
    const { relatedStories,narratorId, ...storyData } = createStoryDto;
    
    const data: Prisma.StoryCreateInput = {
      ...storyData,
      verificationStatus: 'pending',
      narrator: narratorId ? {
        connect: { id: narratorId }
      } : undefined,
      relatedStories: relatedStories ? {
        connect: relatedStories.map(id => ({ id }))
      } : undefined
    };

    return this.prisma.story.create({ data });
  }

  async findAll(params?: {
    language?: string;
    type?: string;
    tags?: string[];
    region?: string;
  }) {
    const where: Prisma.StoryWhereInput = {};

    if (params?.language) {
      where.language = params.language;
    }

    if (params?.type) {
      where.type = params.type;
    }

    if (params?.tags) {
      where.tags = {
        hasEvery: params.tags,
      };
    }

    if (params?.region) {
      where.region = params.region;
    }

    return this.prisma.story.findMany({
      where,
      include: {
        narrator: {
          select: {
            id: true,
            name: true,
          },
        },
        verifier: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const story = await this.prisma.story.findUnique({
      where: { id },
      include: {
        narrator: {
          select: {
            id: true,
            name: true,
          },
        },
        verifier: {
          select: {
            id: true,
            name: true,
          },
        },
        relatedStories: {
          select: {
            id: true,
            title: true,
            type: true,
          },
        },
      },
    });

    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }

    // Increment view count
    await this.prisma.story.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return story;
  }

  async update(id: string, updateStoryDto: UpdateStoryDto) {
    const story = await this.prisma.story.findUnique({
      where: { id },
    });

    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }

    const { relatedStories, narratorId, ...storyData } = updateStoryDto;
    
    const data: Prisma.StoryUpdateInput = {
      ...storyData,
      narrator: narratorId ? {
        connect: { id: narratorId }
      } : undefined,
      relatedStories: relatedStories ? {
        set: relatedStories.map(id => ({ id }))
      } : undefined
    };

    return this.prisma.story.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const story = await this.prisma.story.findUnique({
      where: { id },
    });

    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }

    return this.prisma.story.delete({
      where: { id },
    });
  }

  async verifyStory(id: string, verifierId: string, verificationNotes?: string) {
    const story = await this.prisma.story.findUnique({
      where: { id },
    });

    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }

    return this.prisma.story.update({
      where: { id },
      data: {
        verificationStatus: 'verified',
        verifier: {
          connect: { id: verifierId }
        },
        verificationDate: new Date(),
        verificationNotes,
      },
    });
  }

  async incrementDownloads(id: string) {
    return this.prisma.story.update({
      where: { id },
      data: {
        downloads: {
          increment: 1,
        },
      },
    });
  }

  async incrementShares(id: string) {
    return this.prisma.story.update({
      where: { id },
      data: {
        shares: {
          increment: 1,
        },
      },
    });
  }

  async search(query: string) {
    // This is a simple search implementation
    // In production, you'd want to use a proper search engine like Elasticsearch
    return this.prisma.story.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { text: { contains: query, mode: 'insensitive' } },
          { transcription: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        narrator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
} 