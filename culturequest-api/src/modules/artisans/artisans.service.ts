import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateArtisanDto } from './dto/create-artisan.dto';
import { UpdateArtisanDto } from './dto/update-artisan.dto';

@Injectable()
export class ArtisansService {
  constructor(private prisma: PrismaService) {}

  async create(createArtisanDto: CreateArtisanDto) {
    return this.prisma.artisan.create({
      data: createArtisanDto,
    });
  }

  async findAll(params?: {
    city?: string;
    specialties?: string[];
    profession?: string;
  }) {
    const where: any = {};

    if (params?.city) {
      where.city = params.city;
    }

    if (params?.specialties) {
      where.specialties = {
        hasEvery: params.specialties,
      };
    }

    if (params?.profession) {
      where.profession = params.profession;
    }

    return this.prisma.artisan.findMany({
      where,
      include: {
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
    const artisan = await this.prisma.artisan.findUnique({
      where: { id },
      include: {
        verifier: {
          select: {
            id: true,
            name: true,
          },
        },
        events: {
          select: {
            id: true,
            title: true,
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    if (!artisan) {
      throw new NotFoundException(`Artisan with ID ${id} not found`);
    }

    // Increment view count
    await this.prisma.artisan.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return artisan;
  }

  async update(id: string, updateArtisanDto: UpdateArtisanDto) {
    const artisan = await this.prisma.artisan.findUnique({
      where: { id },
    });

    if (!artisan) {
      throw new NotFoundException(`Artisan with ID ${id} not found`);
    }

    return this.prisma.artisan.update({
      where: { id },
      data: updateArtisanDto,
    });
  }

  async remove(id: string) {
    const artisan = await this.prisma.artisan.findUnique({
      where: { id },
    });

    if (!artisan) {
      throw new NotFoundException(`Artisan with ID ${id} not found`);
    }

    return this.prisma.artisan.delete({
      where: { id },
    });
  }

  async findNearby(latitude: number, longitude: number, radiusKm: number = 10) {
    // This is a simplified version. In production, you'd want to use PostGIS or similar
    // for proper geospatial queries
    const artisans = await this.prisma.artisan.findMany({
      where: {
        coordinates: {
          path: ['latitude'],
          gte: latitude - (radiusKm / 111.32), // rough approximation
          lte: latitude + (radiusKm / 111.32),
        },
      },
    });

    return artisans.filter(artisan => {
      const coords = artisan.coordinates as any;
      if (coords.longitude >= longitude - (radiusKm / (111.32 * Math.cos(latitude * Math.PI / 180))) &&
          coords.longitude <= longitude + (radiusKm / (111.32 * Math.cos(latitude * Math.PI / 180)))) {
        return true;
      }
      return false;
    });
  }

  async verifyArtisan(id: string, verifierId: string) {
    return this.prisma.artisan.update({
      where: { id },
      data: {
        isVerified: true,
        verifiedById: verifierId,
        verificationDate: new Date(),
      },
    });
  }

  async incrementContactCount(id: string) {
    return this.prisma.artisan.update({
      where: { id },
      data: {
        contactCount: {
          increment: 1,
        },
      },
    });
  }
} 