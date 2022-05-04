import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { Profile } from 'passport-spotify';
import { User } from 'src/user/User';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(user: Profile, accessToken: string, refreshToken: string) {
    const payload = {
      name: user.username,
      sub: user.id,
    };

    let dbUser: User = await this.userService.findOne(user.id);

    if (dbUser == null) {
      dbUser = new User();
      dbUser.id = user.id;
      dbUser.email = user.emails[0].value;
      dbUser.photo = user.photos[0]['value'];
    }

    dbUser.access_token = accessToken;
    dbUser.refresh_token = refreshToken;
    this.userService.save(dbUser);
    return this.jwtService.sign(payload);
  }
}
