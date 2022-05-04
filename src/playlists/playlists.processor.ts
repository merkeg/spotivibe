import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job, Queue } from "bull";
import { off } from "process";
import { SpotifyWebApi } from "spotify-web-api-ts/types";
import { Episode, Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { GetMyPlaylistsResponse, GetPlaylistItemsResponse } from "spotify-web-api-ts/types/types/SpotifyResponses";
import { Artist } from "src/artists/Artist";
import { ArtistsService } from "src/artists/artists.service";
import { Song } from "src/songs/Song";
import { SongsService } from "src/songs/songs.service";
import { User } from "src/user/User";
import { UserService } from "src/user/user.service";
import { Playlist } from "./Playlist";
import { PlaylistsService } from "./playlists.service";

@Processor("playlist-queue")
export class PlaylistsProcessor {
  constructor(
    private readonly playlistService: PlaylistsService,
    private readonly userService: UserService,
    private readonly songsService: SongsService,
    private readonly artistsService: ArtistsService,
    @InjectQueue("playlist-queue")
    private queue: Queue<PlaylistQueueDTO>,
  ) {}

  private logger = new Logger("PlaylistProcessor");

  @Process("fetch-user-playlist")
  async processPlaylistFetch(job: Job<PlaylistQueueDTO>) {
    this.logger.debug(`Working on job ${job.id} for user ${job.data.user.id}`);

    const user = job.data.user;
    const spotify = await this.userService.getSpotifyFromUser(user);

    let playlists: GetMyPlaylistsResponse;

    const limit = 20;
    let offset = 0;

    const userPlaylists: Playlist[] = [];
    do {
      playlists = await spotify.playlists.getMyPlaylists({
        limit: limit,
        offset: offset,
      });
      for (const item of playlists.items) {
        let playlist = await this.playlistService.findOne(item.id);

        if (playlist == null) {
          playlist = new Playlist();
          playlist.id = item.id;
          playlist.name = item.name;
          playlist.description = item.description;
          playlist.last_fetch = new Date();
          this.logger.debug(`Found new playlist: "${playlist.name}" (${playlist.id})`);
        }
        playlist.last_fetch = new Date();
        let fetchSongs = false;
        if (playlist.snapshot_id != item.snapshot_id) {
          playlist.snapshot_id = item.snapshot_id;
          fetchSongs = true;
        }
        await this.playlistService.save(playlist);

        if (fetchSongs) {
          this.logger.debug(`Playlist change for playlist "${playlist.name}" (${playlist.id}) detected, queueing fetch`);
          await this.queue.add("fetch-playlist-content", {
            user: user,
            playlist: playlist.id,
          });
        }

        userPlaylists.push(playlist);
      }

      offset += limit;
    } while (offset < playlists.total);

    user.playlists = userPlaylists;
    await this.userService.save(user);
    return userPlaylists;
  }

  @Process("fetch-playlist-content")
  async processPlaylistContentFetch(job: Job<PlaylistQueueDTO>) {
    const user = job.data.user;
    const spotify = await this.userService.getSpotifyFromUser(user);
    const playlist = await this.playlistService.findOne(job.data.playlist);

    const limit = 100;
    let offset = 0;
    let playlistItemsResponse: GetPlaylistItemsResponse;
    const songsInPlaylist: Song[] = [];
    do {
      playlistItemsResponse = await spotify.playlists.getPlaylistItems(playlist.id, {
        limit: limit,
        offset: offset,
      });
      for (const item of playlistItemsResponse.items) {
        if ((item.track as Episode).show) {
          return;
        }
        const responseTrack = item.track as Track;
        let song: Song = await this.songsService.findOne(item.track.id);
        if (song == null) {
          song = new Song();
          song.id = responseTrack.id;
          song.name = responseTrack.name;
          song.duration_ms = responseTrack.duration_ms;
          song.explicit = responseTrack.explicit;
          song.image_url = responseTrack.album.images[0].url;
          song.preview_url = responseTrack.preview_url;
          song.release_date = new Date(responseTrack.album.release_date);
          song.uri = responseTrack.uri;

          const artists: Artist[] = [];
          for (const artist of responseTrack.artists) {
            const artistDTO = await this.artistsService.findOrCreate(artist.id, artist.name);
            artists.push(artistDTO);
          }

          song.artists = artists;
          this.logger.debug(`Found new song "${song.name}" (${song.id})`);
          await this.songsService.save(song);
        }
        songsInPlaylist.push(song);
      }

      offset += limit;
    } while (offset < playlistItemsResponse.total);
    this.logger.debug(`Finished parsing playlist: ${playlist.id}`);
    playlist.songs = songsInPlaylist;
    await this.playlistService.save(playlist);

    return;
  }
}
export class PlaylistQueueDTO {
  user: User;
  playlist?: string;
}
