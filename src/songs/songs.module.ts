import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";
import { Song } from "./Song";
import { SongsService } from "./songs.service";

@Module({
  providers: [SongsService],
  exports: [TypeOrmModule, SongsService],
  imports: [TypeOrmModule.forFeature([Song]), UserModule],
})
export class SongsModule {}
