import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './Artist';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [TypeOrmModule, ArtistsService],
  imports: [TypeOrmModule.forFeature([Artist])],
})
export class ArtistsModule {}
