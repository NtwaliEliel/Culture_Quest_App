import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class UserFeedbackService {
  constructor(private prisma: PrismaService) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    return this.prisma.userFeedback.create({
      data: {
        ...createFeedbackDto,
        status: 'pending',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll(params?: {
    type?: string;
    category?: string;
    status?: string;
    userId?: string;
  }) {
    const where: any = {};

    if (params?.type) {
      where.type = params.type;
    }

    if (params?.category) {
      where.category = params.category;
    }

    if (params?.status) {
      where.status = params.status;
    }

    if (params?.userId) {
      where.userId = params.userId;
    }

    return this.prisma.userFeedback.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const feedback = await this.prisma.userFeedback.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!feedback) {
      throw new NotFoundException(`User feedback with ID ${id} not found`);
    }

    return feedback;
  }

  async update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    const feedback = await this.prisma.userFeedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException(`User feedback with ID ${id} not found`);
    }

    return this.prisma.userFeedback.update({
      where: { id },
      data: updateFeedbackDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const feedback = await this.prisma.userFeedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException(`User feedback with ID ${id} not found`);
    }

    return this.prisma.userFeedback.delete({
      where: { id },
    });
  }

  async updateStatus(id: string, status: string) {
    const feedback = await this.prisma.userFeedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException(`User feedback with ID ${id} not found`);
    }

    return this.prisma.userFeedback.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.userFeedback.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getStats() {
    const feedbacks = await this.prisma.userFeedback.groupBy({
      by: ['status', 'type', 'category'],
      _count: true,
    });

    return {
      total: feedbacks.reduce((sum, item) => sum + item._count, 0),
      byStatus: feedbacks.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + item._count;
        return acc;
      }, {}),
      byType: feedbacks.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + item._count;
        return acc;
      }, {}),
      byCategory: feedbacks.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item._count;
        return acc;
      }, {}),
    };
  }
} 