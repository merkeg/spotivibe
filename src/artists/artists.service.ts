import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './Artist';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async findOne(artistId: string): Promise<Artist> {
    return await this.artistRepository.findOne(artistId);
  }

  async findOrCreate(artistId: string, artistName: string): Promise<Artist> {
    let artist = await this.findOne(artistId);
    if (artist == null) {
      artist = new Artist();
      artist.id = artistId;
      artist.name = artistName;
      await this.save(artist);
    }
    return artist;
  }

  async save(artist: Artist) {
    await this.artistRepository.save(artist);
  }
}
