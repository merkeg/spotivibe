import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { use } from "passport";
import { JwtAuthGuard } from "src/guards/jwt.guard";
import { Playlist } from "src/playlists/Playlist";
import { PlaylistsService } from "src/playlists/playlists.service";
import { SongsService } from "src/songs/songs.service";
import { UserService } from "src/user/user.service";
import { NamedService } from "./named.service";
import { NamedPlaylist } from "./NamedPlaylist";

export class CreateNamedPlaylistRequest {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  color: string;

  @ApiProperty({ required: false })
  basePlaylistId?: string;
}

@ApiTags("Named Playlists")
@Controller("named-playlists")
export class NamedController {
  constructor(private playlistService: PlaylistsService, private userService: UserService, private namedPlaylistService: NamedService, private songsService: SongsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: "Create a new named playlist",
    description: "Created a new named playlist either with an existing playlist or a new one",
  })
  @ApiCreatedResponse({ description: "Named Playlist created", type: NamedPlaylist })
  @ApiNotFoundResponse({ description: "Base playlist was not found" })
  @ApiForbiddenResponse({ description: "No access to base playlist" })
  async createNamedPlaylist(@Body() body: CreateNamedPlaylistRequest, @Req() req: Request, @Res() res: Response) {
    const user = await this.userService.findOne(req.user["sub"], { relations: ["playlists", "namedPlaylists"] });

    let playlist: Playlist;
    if (body.basePlaylistId != null) {
      playlist = await this.playlistService.findOne(body.basePlaylistId);
      if (playlist == null) {
        return res.status(HttpStatus.NOT_FOUND).send();
      } else {
        if (!user.playlists.find((p) => p.id == playlist.id)) {
          return res.status(HttpStatus.FORBIDDEN).send();
        }
      }
    } else {
      playlist = await this.playlistService.createPlaylist(user, body.name);
    }

    const namedPlaylist = await this.namedPlaylistService.createNamedPlaylist(user, body.name, body.color, playlist);
    namedPlaylist.owner = null;
    return res.status(HttpStatus.CREATED).json(namedPlaylist);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":playlistId/:songId")
  @ApiOperation({
    summary: "Add a song to a named playlist",
  })
  @ApiCreatedResponse({ description: "Song added to named playlist" })
  @ApiNotFoundResponse({ description: "Song or named playlist not found" })
  @ApiForbiddenResponse({ description: "No access to named playlist" })
  async addSongToNamedPlaylist(@Req() req: Request, @Res() res: Response, @Param("playlistId") playlistId: string, @Param("songId") songId: string) {
    const user = await this.userService.findOne(req.user["sub"], { relations: ["namedPlaylists"] });
    const playlist = await this.namedPlaylistService.findOne(playlistId, { relations: ["playlist", "owner"] });
    const song = await this.songsService.findOne(songId);
    if (song == null || playlist == null) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    if (playlist.owner.id != user.id) {
      return res.status(HttpStatus.FORBIDDEN).send();
    }

    this.playlistService.addSongToPlaylist(user, playlist.playlist, song);
    return res.status(HttpStatus.CREATED).send();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":playlistId/:songId")
  @ApiOperation({
    summary: "Remove song from a named playlist",
  })
  @ApiOkResponse({ description: "Song added to named playlist" })
  @ApiNotFoundResponse({ description: "Song or named playlist not found" })
  @ApiForbiddenResponse({ description: "No access to named playlist" })
  async removeSongFromNamedPlaylist() {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: "Get named playlists",
  })
  @ApiOkResponse({ description: "List of named playlists", type: [NamedPlaylist] })
  async getNamedPlaylists(@Req() req: Request, @Res() res: Response) {
    const user = await this.userService.findOne(req.user["sub"], { relations: ["namedPlaylists", "namedPlaylists.playlist"] });
    return res.status(HttpStatus.OK).json(user.namedPlaylists);
  }
}
