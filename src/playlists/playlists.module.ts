import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";
import { Playlist } from "./Playlist";
import { PlaylistsProcessor } from "./playlists.processor";
import { PlaylistsController } from "./playlists.controller";
import { PlaylistsService } from "./playlists.service";
import { SongsModule } from "src/songs/songs.module";
import { ArtistsModule } from "src/artists/artists.module";

@Module({
  exports: [TypeOrmModule, PlaylistsService],
  controllers: [PlaylistsController],
  providers: [PlaylistsModule, PlaylistsService, PlaylistsProcessor],
  imports: [
    UserModule,
    SongsModule,
    ArtistsModule,
    BullModule.registerQueue({
      name: "playlist-queue",
      limiter: { duration: 1000, max: 10 },
    }),
    TypeOrmModule.forFeature([Playlist]),
  ],
})
export class PlaylistsModule {}
