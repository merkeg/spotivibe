import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PlaylistsController } from './playlists/playlists.controller';
import { PlaylistsService } from './playlists/playlists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { User } from './user/User';
import { UserModule } from './user/user.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { SongsController } from './songs/songs.controller';
import { SongsModule } from './songs/songs.module';
import { ArtistsModule } from './artists/artists.module';
import { Playlist } from './playlists/Playlist';
import { Song } from './songs/Song';
import { Artist } from './artists/Artist';
import { BullModule } from '@nestjs/bull';
import { NamedService } from './named/named.service';
import { NamedController } from './named/named.controller';
import { NamedModule } from './named/named.module';
import { NamedPlaylist } from './named/NamedPlaylist';
import { QueueController } from './queue/queue.controller';
import { QueueService } from './queue/queue.service';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Playlist, Song, Artist, NamedPlaylist],
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT as unknown as number,
      },
    }),
    BullModule.registerQueue({ name: 'playlist-queue' }),
    UserModule,
    PlaylistsModule,
    SongsModule,
    ArtistsModule,
    NamedModule,
    QueueModule,
  ],
  controllers: [
    AppController,
    PlaylistsController,
    SongsController,
    NamedController,
    QueueController,
  ],
  providers: [AppService, PlaylistsService, UserService, NamedService, QueueService],
})
export class AppModule {}
