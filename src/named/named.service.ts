import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "src/playlists/Playlist";
import { PlaylistsService } from "src/playlists/playlists.service";
import { User } from "src/user/User";
import { FindOneOptions, Repository } from "typeorm";
import { NamedPlaylist } from "./NamedPlaylist";

@Injectable()
export class NamedService {
  constructor(
    @InjectRepository(NamedPlaylist)
    private namedPlaylistRepository: Repository<NamedPlaylist>,
    private readonly playlistService: PlaylistsService,
  ) {}

  async createNamedPlaylist(owner: User, name: string, color: string, basePlaylist: Playlist): Promise<NamedPlaylist> {
    const playlist = new NamedPlaylist();
    playlist.name = name;
    playlist.color = color;
    playlist.playlist = basePlaylist;
    playlist.owner = owner;
    await this.save(playlist);

    return playlist;
  }

  async save(playlist: NamedPlaylist) {
    await this.namedPlaylistRepository.save(playlist);
  }

  async findOne(playlistId: string, options?: FindOneOptions<NamedPlaylist>): Promise<NamedPlaylist> {
    return await this.namedPlaylistRepository.findOne(playlistId, options);
  }
}
