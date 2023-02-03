


import { Get, Body, Param, Delete, Put, UseGuards, UseInterceptors, ClassSerializerInterceptor, Req, Inject, Controller } from '@nestjs/common';
import { UsersService } from './users.service';


import { DeleteAccountDto, UpdatePasswordDto } from './dto/update-user.dto';


import { User } from './entities';

import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/Auth.guard';
import { JwtAuthGuardAdmin } from 'src/admin/auth/Auth.guard';







@Controller('users')
export class UsersController {
  @Inject(UsersService)
  private readonly usersService: UsersService;


  @Get()
  @UseGuards(JwtAuthGuardAdmin)
  findAll() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getFilteredRepsonseUser(+id);
  }

  @Delete("delete")

  @UseGuards(JwtAuthGuard)

  DeleteAccount(@Body() body: DeleteAccountDto, @Req() req: Request) {
    return this.usersService.DeleteAccount(body, req);
  }


  @Put("password")

  @UseGuards(JwtAuthGuard)

  // @UseInterceptors(ClassSerializerInterceptor)

  UpdatePassword(@Body() body: UpdatePasswordDto, @Req() req: Request): Promise<User> {
    return this.usersService.UpdatePassword(body, req);
  }

  // @Delete(":id")
  // @UseGuards(JwtAuthGuardAdmin)
  // delete(@Param('id') id: string) {
  //   return this.usersService.Delete(+id);
  // }


}
