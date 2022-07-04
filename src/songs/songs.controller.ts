import { Controller, Get, HttpStatus, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SongsService } from "./songs.service";
import { Request, Response } from "express";
import { Song } from "./Song";
import { UserService } from "src/user/user.service";
import { JwtAuthGuard } from "src/guards/jwt.guard";

@ApiTags("Songs")
@Controller("songs")
export class SongsController {
  constructor(private songsService: SongsService, private userService: UserService) {}

  @Get(":songId")
  @ApiOperation({
    summary: "Get Song",
  })
  @ApiOkResponse({ description: "Response with song data", type: Song })
  @ApiNotFoundResponse({ description: "Song not found or not yet fetched" })
  async getSong(@Param("songId") songId: string, @Req() req: Request, @Res() res: Response) {
    const song = await this.songsService.findOne(songId);
    if (song == null) {
      res.status(HttpStatus.NOT_FOUND).send();
    }
    res.status(HttpStatus.OK).json(song);
  }

  @UseGuards(JwtAuthGuard)
  @Post("play/:songUri")
  @ApiOperation({
    summary: "Play Song",
    description: "Play an song on an active spotify device",
  })
  @ApiOkResponse({ description: "Play song on device" })
  async playSong(@Param("songUri") songUri: string, @Req() req: Request, @Res() res: Response) {
    const spotify = await this.userService.getSpotifyApiFromUserId(req.user["sub"]);
    spotify.player.play({ uris: [songUri] });
    res.status(HttpStatus.OK).send();
  }
}
