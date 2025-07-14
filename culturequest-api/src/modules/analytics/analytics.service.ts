import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async create(createAnalyticsDto: CreateAnalyticsDto) {
    return this.prisma.analytics.create({
      data: createAnalyticsDto,
    });
  }

  async findAll(params?: {
    type?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const where: any = {};

    if (params?.type) {
      where.type = params.type;
    }

    if (params?.startDate) {
      where.timestamp = {
        gte: params.startDate,
      };
    }

    if (params?.endDate) {
      where.timestamp = {
        ...(where.timestamp || {}),
        lte: params.endDate,
      };
    }

    return this.prisma.analytics.findMany({
      where,
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const analytics = await this.prisma.analytics.findUnique({
      where: { id },
    });

    if (!analytics) {
      throw new NotFoundException(`Analytics entry with ID ${id} not found`);
    }

    return analytics;
  }

  async update(id: string, updateAnalyticsDto: UpdateAnalyticsDto) {
    const analytics = await this.prisma.analytics.findUnique({
      where: { id },
    });

    if (!analytics) {
      throw new NotFoundException(`Analytics entry with ID ${id} not found`);
    }

    return this.prisma.analytics.update({
      where: { id },
      data: updateAnalyticsDto,
    });
  }

  async remove(id: string) {
    const analytics = await this.prisma.analytics.findUnique({
      where: { id },
    });

    if (!analytics) {
      throw new NotFoundException(`Analytics entry with ID ${id} not found`);
    }

    return this.prisma.analytics.delete({
      where: { id },
    });
  }

  async getAggregatedStats(type: string, startDate: Date, endDate: Date) {
    const analytics = await this.prisma.analytics.findMany({
      where: {
        type,
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const total = analytics.reduce((sum, entry) => sum + entry.value, 0);
    const average = total / analytics.length || 0;

    return {
      type,
      total,
      average,
      count: analytics.length,
      startDate,
      endDate,
    };
  }

  async getTopContent(type: string, limit: number = 10) {
    const analytics = await this.prisma.analytics.groupBy({
      by: ['metadata'],
      where: {
        type,
      },
      _sum: {
        value: true,
      },
      orderBy: {
        _sum: {
          value: 'desc',
        },
      },
      take: limit,
    });

    return analytics.map(entry => ({
      metadata: entry.metadata,
      total: entry._sum.value,
    }));
  }

  async getTrends(type: string, days: number = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const analytics = await this.prisma.analytics.groupBy({
      by: ['timestamp'],
      where: {
        type,
        timestamp: {
          gte: startDate,
        },
      },
      _sum: {
        value: true,
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    return analytics.map(entry => ({
      date: entry.timestamp,
      value: entry._sum.value,
    }));
  }
} 