import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlockJwtEntity } from "src/user/entity/block.jwt.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(BlockJwtEntity)
    private bJwtRepository: Repository<BlockJwtEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const auth = request.headers['authorization'];
    const jwt = auth?.replace('bearer ', '');
    if (!jwt || !payload.user) {
      return;
    }

    const isExistJwt = await this.bJwtRepository.count({
      token: jwt,
      user: payload.user
    }) > 0;
    if (isExistJwt) return;
    return payload.user;
  }
}
