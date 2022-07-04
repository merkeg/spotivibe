import { Controller, Get, HttpStatus, Logger, Req, Res, UseGuards } from "@nestjs/common";
import { Profile } from "passport-spotify";
import { SpotifyOAuthGuard } from "src/guards/spotify.guard";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { ApiOkResponse, ApiOperation, ApiProperty, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt.guard";
import { UserService } from "src/user/user.service";

export class ProfileDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  product: string;
}

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UserService) {}
  private logger = new Logger("AuthController");

  @UseGuards(SpotifyOAuthGuard)
  @Get("login")
  @ApiOperation({
    summary: "Login and get redirected",
  })
  login(): void {
    return;
  }

  @UseGuards(SpotifyOAuthGuard)
  @Get("callback")
  @ApiOperation({
    summary: "Get login callback from spotify",
  })
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
    res.cookie("token", jwt, { maxAge: 1000 * 60 * 60, httpOnly: true });
    this.logger.debug("Gave out jwt: " + jwt);
    return res.status(201).send("<script>window.close();</script > ");
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  @ApiOperation({
    summary: "Get user profile",
  })
  @ApiOkResponse({ description: "response with user profile", type: ProfileDTO })
  @ApiUnauthorizedResponse({ description: "not logged in" })
  async getProfile(@Req() req: Request, @Res() res: Response) {
    const user = await this.userService.findOne(req.user["sub"], { relations: ["namedPlaylists"] });
    const dto: ProfileDTO = {
      id: user.id,
      email: user.email,
      photo: user.photo,
      product: user.product,
    };
    return res.status(HttpStatus.OK).json(dto);
  }
}
