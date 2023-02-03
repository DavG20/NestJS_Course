import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "../entities/admin.entity";
import { AuthAdminHelper } from "./Authadmin.Helper";
import { AdminLoginDto, CreateAdminDto } from "./dto/create-auth.dto";


@Injectable()
export class AuthAdminService {
  @InjectRepository(Admin)
  private readonly repository: Repository<Admin>;

  @Inject(AuthAdminHelper)
  private readonly helper: AuthAdminHelper;

  public async register(body: CreateAdminDto): Promise<Admin | never> {
    const { email, password }: CreateAdminDto = body;
    let admin: Admin = await this.repository.findOne({ where: { email } });

    // check if email is taken

    if (admin) {
      throw new HttpException('Email Taken', HttpStatus.CONFLICT);
    }


    admin = new Admin();


    admin.email = email;
    admin.password = this.helper.encodePassword(password);

    return this.repository.save(admin);
  }

  public async login(body: AdminLoginDto): Promise<string | never> {
    const { email, password }: AdminLoginDto = body;
    const admin: Admin = await this.repository.findOne({ where: { email } });

    if (!admin) {
      throw new HttpException('No admin found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, admin.password);

    if (!isPasswordValid) {
      throw new HttpException('No admin found', HttpStatus.NOT_FOUND);
    }



    return this.helper.generateToken(admin);
  }


  delete(id: number) {
    return this.repository.delete({ id });
  }

}
