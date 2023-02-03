import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from "bcrypt";

import { Admin } from '../entities/admin.entity';


@Injectable()
export class AuthAdminHelper {
  @InjectRepository(Admin)
  private readonly repository: Repository<Admin>;

  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  
  public async validateAdmin(decoded: any): Promise<any> {
    let id = decoded.id;
  
    return this.repository.findOneBy({ id });
  }

  // Generate JWT Token
  public generateToken(admin: Admin): string {
    return this.jwt.sign({ id: admin.id, email: admin.email });
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid

  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    
    const admin: Admin = await this.validateAdmin(decoded);
    
    if (!admin) {
      throw new UnauthorizedException();
    }

    return true;
  }
}