import { Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { use } from "passport";
import { JwtAuthGuard } from "src/guards/jwt.guard";
import { UserService } from "src/user/user.service";
import { Playlist } from "./Playlist";
import { PlaylistsService } from "./playlists.service";

@ApiTags("Playlist")
@Controller("playlists")
export class PlaylistsController {
  constructor(private readonly playlistService: PlaylistsService, private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post("fetch")
  @ApiOperation({
    summary: "Fetch all playlists from user",
    description: "Fetch all playlists from user and its content, if needed",
  })
  @ApiCreatedResponse({ description: "Fetch request added to queue" })
  async fetchUserPlaylists(@Req() req: Request) {
    const user = await this.userService.findOne(req.user["sub"]);

    await this.playlistService.enqueueUserPlaylistFetch(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: "Get user playlists",
  })
  @ApiOkResponse({
    description: "Response with playlists",
    type: [Playlist],
  })
  async getUserPlaylists(@Req() req: Request, @Res() res: Response) {
    res.status(HttpStatus.OK).json(await this.playlistService.getUserPlaylistsId(req.user["sub"], false));
  }

  @Get(":playlistId")
  @ApiOperation({
    summary: "Get playlist",
  })
  @ApiOkResponse({ description: "response with playlist data", type: Playlist })
  @ApiForbiddenResponse({
    description: "User does not have access to the playlist",
  })
  async getPlaylist(@Param("playlistId") playlistId: string, @Req() req: Request, @Res() res: Response) {
    const user = await this.userService.findOne(req.user["sub"], {
      relations: ["playlists"],
    });
    const playlist = user.playlists.find((pl) => pl.id == playlistId);
    if (playlist != null) {
      res.status(HttpStatus.OK).json(playlist);
    } else {
      res.status(HttpStatus.FORBIDDEN).send();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(":playlistId/fetch")
  @ApiOperation({
    summary: "Fetch playlist from user",
    description: "Fetch playlist content from user",
  })
  @ApiCreatedResponse({ description: "Fetch request added to queue" })
  @ApiForbiddenResponse({
    description: "User does not have access to the playlist",
  })
  async fetchPlaylist(@Param("playlistId") playlistId: string, @Req() req: Request, @Res() res: Response) {
    const user = await this.userService.findOne(req.user["sub"], {
      relations: ["playlists"],
    });
    if (user.playlists.find((pl) => pl.id == playlistId)) {
      await this.playlistService.enqueuePlaylistFetch(user, playlistId);
      res.status(HttpStatus.CREATED).send();
    } else {
      res.status(HttpStatus.FORBIDDEN).send();
    }
  }
}
