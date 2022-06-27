import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { NamedService } from "src/named/named.service";
import { PlaylistsService } from "src/playlists/playlists.service";
import { SongsService } from "src/songs/songs.service";
import { UserService } from "src/user/user.service";
import { Queue } from "./Queue";

@Injectable()
export class QueueService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly userService: UserService,
    private readonly playlistsService: PlaylistsService,
    private readonly namedPlaylistsService: NamedService,
    private readonly songService: SongsService,
  ) {}

  async getOrFetchQueue(userId: string, forceRefetch = false): Promise<Queue> {
    let queue: Queue = await this.cacheManager.get(userId);

    if (queue == null || forceRefetch) {
      queue = await this.fetchQueue(userId);
    }

    return queue;
  }

  async fetchQueue(userId: string): Promise<Queue> {
    const queue = new Queue();
    queue.songs = [];
    queue.excluded = [];

    const playlists = await this.playlistsService.getUserPlaylistsId(userId);
    playlists.forEach((playlist) => queue.songs.push(...playlist.songs));

    const namedPlaylists = await this.namedPlaylistsService.getNamedPlaylistsId(userId);
    namedPlaylists.forEach((playlist) => queue.excluded.push(...playlist.playlist.songs));

    this.cacheManager.set(userId, queue);
    queue.shuffle();
    return queue;
  }
}
