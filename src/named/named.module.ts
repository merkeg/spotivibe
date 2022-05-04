import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlaylistsModule } from "src/playlists/playlists.module";
import { SongsModule } from "src/songs/songs.module";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { NamedController } from "./named.controller";
import { NamedService } from "./named.service";
import { NamedPlaylist } from "./NamedPlaylist";

@Module({
  exports: [TypeOrmModule, NamedService],
  providers: [NamedModule, NamedService],
  controllers: [NamedController],
  imports: [TypeOrmModule.forFeature([NamedPlaylist]), UserModule, PlaylistsModule, SongsModule],
})
export class NamedModule {}
