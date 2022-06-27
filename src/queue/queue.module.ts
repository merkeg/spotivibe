import { CacheModule, Module } from "@nestjs/common";
import { NamedModule } from "src/named/named.module";
import { PlaylistsModule } from "src/playlists/playlists.module";
import { SongsModule } from "src/songs/songs.module";
import { UserModule } from "src/user/user.module";
import { QueueController } from "./queue.controller";
import { QueueService } from "./queue.service";

@Module({
  providers: [QueueService],
  exports: [QueueService],
  imports: [CacheModule.register({ ttl: 60 * 30, isGlobal: true }), PlaylistsModule, SongsModule, UserModule, NamedModule],
  controllers: [QueueController],
})
export class QueueModule {}
