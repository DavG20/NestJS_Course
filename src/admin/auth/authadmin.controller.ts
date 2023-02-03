import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Inject, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

import { Admin } from "../entities/admin.entity";

import { AuthAdminService } from "./authadmin.service";
import { AdminLoginDto, CreateAdminDto } from "./dto/create-auth.dto";


@Controller('admin')
export class AuthAdminController {
  @Inject(AuthAdminService)
  private readonly service: AuthAdminService;



  @Post('register')
  // @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: CreateAdminDto): Promise<Admin | never> {
    return this.service.register(body);
  }

  @Post('login')
  private login(@Body() body: AdminLoginDto): Promise<string | never> {
    return this.service.login(body);
  }


  @Delete(':id')
  findOne(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}