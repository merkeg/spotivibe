import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { async } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { SpotifyOAuthStrategy } from 'src/strategies/spotify.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthService, JwtStrategy, SpotifyOAuthStrategy],
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '3600s',
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
})
export class AuthModule {}
