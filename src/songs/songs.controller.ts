import { Controller, Get, HttpStatus, Param, Req, Res } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SongsService } from "./songs.service";
import { Request, Response } from "express";
import { Song } from "./Song";

@ApiTags("Songs")
@Controller("songs")
export class SongsController {
  constructor(private songsService: SongsService) {}

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
}
