import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request as RequestType } from "express";
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT, ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { name: string; sub: string }): Promise<{ name: string; sub: string }> {
    return payload;
  }

  private static extractJWT(req: RequestType): string | null {
    if (req.cookies && "token" in req.cookies && req.cookies.token.length > 0) {
      return req.cookies.token;
    }
    return null;
  }
}
