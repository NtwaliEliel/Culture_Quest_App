import { PartialType } from '@nestjs/swagger';
import { CreateArtisanDto } from './create-artisan.dto';

export class UpdateArtisanDto extends PartialType(CreateArtisanDto) {} 