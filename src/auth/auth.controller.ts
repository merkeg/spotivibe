import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { Profile } from "passport-spotify";
import { SpotifyOAuthGuard } from "src/guards/spotify.guard";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(SpotifyOAuthGuard)
  @Get("login")
  login(): void {
    return;
  }

  @UseGuards(SpotifyOAuthGuard)
  @Get("callback")
  async spotifyAuthRedirect(@Req() req: any, @Res() res: Response): Promise<Response> {
    const {
      user,
      authInfo,
    }: {
      user: Profile;
      authInfo: {
        accessToken: string;
        refreshToken: string;
        expires_in: number;
      };
    } = req;

    if (!user) {
      res.redirect("/");
      return;
    }

    req.user = undefined;

    const jwt = await this.authService.login(user, authInfo.accessToken, authInfo.refreshToken);

    res.set("authorization", `Bearer ${jwt}`);

    return res.status(201).send(jwt);
  }
}
