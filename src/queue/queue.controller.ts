import { Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt.guard";
import { QueueService } from "./queue.service";
import { Request, Response } from "express";
import { Song } from "src/songs/Song";

@Controller("queue")
@ApiTags("Queue")
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @UseGuards(JwtAuthGuard)
  @Get("")
  @ApiOperation({
    summary: "Get user song queue",
    description: "Get user song queue",
  })
  @ApiOkResponse({ description: "Queue sent", type: [Song] })
  async fetchUserPlaylists(@Req() req: Request, @Query("size") size = 10) {
    const queue = await this.queueService.getOrFetchQueue(req.user["sub"], false);
    return queue.get(size);
  }
}
