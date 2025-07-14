import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const { artisanIds, ...eventData } = createEventDto;
    return this.prisma.event.create({
      data: {
        ...eventData,
        artisans: {
          connect: artisanIds.map(id => ({ id })),
        },
      },
      include: {
        artisans: {
          select: {
            id: true,
            name: true,
            profession: true,
          },
        },
      },
    });
  }

  async findAll(params?: {
    category?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const where: any = {};

    if (params?.category) {
      where.category = params.category;
    }

    if (params?.startDate) {
      where.startDate = {
        gte: params.startDate,
      };
    }

    if (params?.endDate) {
      where.endDate = {
        lte: params.endDate,
      };
    }

    return this.prisma.event.findMany({
      where,
      include: {
        artisans: {
          select: {
            id: true,
            name: true,
            profession: true,
          },
        },
      },
      orderBy: {
        startDate: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        artisans: {
          select: {
            id: true,
            name: true,
            profession: true,
            specialties: true,
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    const { artisanIds, ...eventData } = updateEventDto;
    return this.prisma.event.update({
      where: { id },
      data: {
        ...eventData,
        ...(artisanIds && {
          artisans: {
            set: artisanIds.map(id => ({ id })),
          },
        }),
      },
      include: {
        artisans: {
          select: {
            id: true,
            name: true,
            profession: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return this.prisma.event.delete({
      where: { id },
    });
  }

  async findNearby(latitude: number, longitude: number, radiusKm: number = 10) {
    // This is a simplified version. In production, you'd want to use PostGIS or similar
    // for proper geospatial queries
    const events = await this.prisma.event.findMany({
      where: {
        coordinates: {
          path: ['latitude'],
          gte: latitude - (radiusKm / 111.32), // rough approximation
          lte: latitude + (radiusKm / 111.32),
        },
      },
      include: {
        artisans: {
          select: {
            id: true,
            name: true,
            profession: true,
          },
        },
      },
    });

    return events.filter(event => {
      const coords = event.coordinates as any;
      if (coords.longitude >= longitude - (radiusKm / (111.32 * Math.cos(latitude * Math.PI / 180))) &&
          coords.longitude <= longitude + (radiusKm / (111.32 * Math.cos(latitude * Math.PI / 180)))) {
        return true;
      }
      return false;
    });
  }

  async markInterested(id: string) {
    return this.prisma.event.update({
      where: { id },
      data: {
        interestedCount: {
          increment: 1,
        },
      },
    });
  }

  async markAttending(id: string) {
    return this.prisma.event.update({
      where: { id },
      data: {
        attendingCount: {
          increment: 1,
        },
      },
    });
  }

  async incrementShares(id: string) {
    return this.prisma.event.update({
      where: { id },
      data: {
        sharesCount: {
          increment: 1,
        },
      },
    });
  }
} 