import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Song } from "./Song";

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private playlistRepository: Repository<Song>,
  ) {}

  async findOne(songId: string): Promise<Song> {
    return await this.playlistRepository.findOne(songId, {
      relations: ["artists"],
    });
  }

  async save(song: Song) {
    await this.playlistRepository.save(song);
  }
}
