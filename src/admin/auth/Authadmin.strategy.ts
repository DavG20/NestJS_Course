import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthAdminHelper } from './Authadmin.Helper';




@Injectable()
export class JwtStrategyAdmin extends PassportStrategy(Strategy) {
  @Inject(AuthAdminHelper)
  private readonly helper: AuthAdminHelper;

  constructor(@Inject(ConfigService) config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_KEY'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: string): Promise<any> {
    return this.helper.validateAdmin(payload);
    
  }
}