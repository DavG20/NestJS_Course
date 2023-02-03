import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Admin } from "../entities/admin.entity";
import { AuthAdminController } from "./authadmin.controller";
import { AuthAdminHelper } from "./Authadmin.Helper";
import { AuthAdminService } from "./authadmin.service";
import { JwtStrategyAdmin } from "./Authadmin.strategy";





@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_KEY'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES') },
      }),
    }),
    TypeOrmModule.forFeature([Admin]),
  ],
  controllers: [AuthAdminController],
  providers: [AuthAdminService, AuthAdminHelper, JwtStrategyAdmin],
})
export class AuthAdminModule {}