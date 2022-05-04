import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './Song';
import { SongsService } from './songs.service';

@Module({
  providers: [SongsService],
  exports: [TypeOrmModule, SongsService],
  imports: [TypeOrmModule.forFeature([Song])],
})
export class SongsModule {}
