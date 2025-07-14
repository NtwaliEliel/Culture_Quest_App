import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateModerationDto } from './dto/create-moderation.dto';
import { UpdateModerationDto } from './dto/update-moderation.dto';

@Injectable()
export class ContentModerationService {
  constructor(private prisma: PrismaService) {}

  async create(createModerationDto: CreateModerationDto) {
    return this.prisma.contentModeration.create({
      data: createModerationDto,
      include: {
        moderator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findAll(params?: {
    contentType?: string;
    status?: string;
    moderatorId?: string;
  }) {
    const where: any = {};

    if (params?.contentType) {
      where.contentType = params.contentType;
    }

    if (params?.status) {
      where.status = params.status;
    }

    if (params?.moderatorId) {
      where.moderatorId = params.moderatorId;
    }

    return this.prisma.contentModeration.findMany({
      where,
      include: {
        moderator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const moderation = await this.prisma.contentModeration.findUnique({
      where: { id },
      include: {
        moderator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!moderation) {
      throw new NotFoundException(`Content moderation with ID ${id} not found`);
    }

    return moderation;
  }

  async update(id: string, updateModerationDto: UpdateModerationDto) {
    const moderation = await this.prisma.contentModeration.findUnique({
      where: { id },
    });

    if (!moderation) {
      throw new NotFoundException(`Content moderation with ID ${id} not found`);
    }

    return this.prisma.contentModeration.update({
      where: { id },
      data: updateModerationDto,
      include: {
        moderator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const moderation = await this.prisma.contentModeration.findUnique({
      where: { id },
    });

    if (!moderation) {
      throw new NotFoundException(`Content moderation with ID ${id} not found`);
    }

    return this.prisma.contentModeration.delete({
      where: { id },
    });
  }

  async findByContent(contentType: string, contentId: string) {
    return this.prisma.contentModeration.findMany({
      where: {
        contentType,
        contentId,
      },
      include: {
        moderator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  async findByModerator(moderatorId: string) {
    return this.prisma.contentModeration.findMany({
      where: {
        moderatorId,
      },
      include: {
        moderator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }
} 