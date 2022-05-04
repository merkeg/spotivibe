import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-spotify';

export class SpotifyOAuthStrategy extends PassportStrategy(
  Strategy,
  'spotify',
) {
  constructor() {
    super(
      {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: process.env.SPOTIFY_REDIRECT_URI,
        scope: process.env.SPOTIFY_SCOPE,
      },
      (
        accessToken: string,
        refreshToken: string,
        expires_in: number,
        profile: Profile,
        done: VerifyCallback,
      ): void => {
        return done(null, profile, { accessToken, refreshToken, expires_in });
      },
    );
  }
}
