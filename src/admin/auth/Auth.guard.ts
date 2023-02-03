import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard, IAuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { Admin } from "../entities/admin.entity";

@Injectable()
export class JwtAuthGuardAdmin extends AuthGuard('jwt') {
  public handleRequest(err: unknown, admin: Admin): any {
    return admin;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const { user }: Request = context.switchToHttp().getRequest();

    return user ? true : false;
  }
}