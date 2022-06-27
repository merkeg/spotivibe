import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SpotifyWebApi } from "spotify-web-api-ts";
import { FindOneOptions, Repository } from "typeorm";
import { User } from "./User";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  save(user: User) {
    this.usersRepository.save(user);
  }

  findOne(id: string, options: FindOneOptions<User> = null): Promise<User> {
    return this.usersRepository.findOne(id, options);
  }

  async getSpotifyApiFromUserId(id: string): Promise<SpotifyWebApi> {
    const user: User = await this.findOne(id);
    if (user == null) return null;
    return this.getSpotifyFromUser(user);
  }

  async getSpotifyFromUser(user: User): Promise<SpotifyWebApi> {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(user.access_token);
    return spotifyApi;
  }
}
