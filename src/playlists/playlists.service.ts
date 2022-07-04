import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Queue } from "bull";
import { SpotifyWebApi } from "spotify-web-api-ts/types";
import { Song } from "src/songs/Song";
import { User } from "src/user/User";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { Playlist } from "./Playlist";
import { PlaylistQueueDTO } from "./playlists.processor";

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    @InjectQueue("playlist-queue")
    private queue: Queue<PlaylistQueueDTO>,
    private readonly userService: UserService,
  ) {}
  private logger = new Logger("PlaylistsService");

  async findOne(playlistId: string): Promise<Playlist> {
    return await this.playlistRepository.findOne(playlistId);
  }

  async save(playlist: Playlist) {
    await this.playlistRepository.save(playlist);
  }

  async enqueueUserPlaylistFetch(user: User) {
    this.logger.log(`Added fetch request to queue for user: ${user.id}`);
    await this.queue.add("fetch-user-playlist", {
      user: user,
    });
  }

  async enqueuePlaylistFetch(user: User, playlistId: string) {
    this.logger.log(`Added playlist fetch request to queue for user: ${user.id}`);
    await this.queue.add("fetch-playlist-content", {
      user: user,
      playlist: playlistId,
    });
  }

  async getUserPlaylistsId(userId: string, fullData = true): Promise<Playlist[]> {
    const rel = ["playlists"];
    if (fullData) {
      rel.push("playlists.songs", "playlists.songs.artists");
    }
    const user: User = await this.userService.findOne(userId, {
      relations: rel,
    });

    return user.playlists;
  }

  async createPlaylist(user: User, name: string): Promise<Playlist> {
    const spotify = await this.userService.getSpotifyFromUser(user);
    const spotifyPlaylist = await spotify.playlists.createPlaylist(user.id, name, { public: false });

    const playlist = new Playlist();
    playlist.id = spotifyPlaylist.id;
    playlist.description = "A playlist by Spotivibe";
    playlist.name = spotifyPlaylist.name;
    playlist.last_fetch = new Date();
    playlist.snapshot_id = spotifyPlaylist.snapshot_id;
    playlist.songs = [];
    await this.save(playlist);

    return playlist;
  }

  async addSongToPlaylist(user: User, playlist: Playlist, song: Song) {
    await this.addSongToPlaylistId(user, playlist.id, song.uri);
  }

  async addSongToPlaylistId(user: User, playlistId: string, songUri: string) {
    const spotify = await this.userService.getSpotifyFromUser(user);
    await spotify.playlists.addItemToPlaylist(playlistId, songUri);
    await this.enqueuePlaylistFetch(user, playlistId);
  }
}
