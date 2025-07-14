import { Module } from '@nestjs/common';
import { ArtisansService } from './artisans.service';
import { ArtisansController } from './artisans.controller';

@Module({
  controllers: [ArtisansController],
  providers: [ArtisansService],
  exports: [ArtisansService],
})
export class ArtisansModule {} 