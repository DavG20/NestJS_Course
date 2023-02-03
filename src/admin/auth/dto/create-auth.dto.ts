import { Trim } from "class-sanitizer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAdminDto {
    

    @Trim()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @Trim()
    @IsNotEmpty()
    @IsEmail()
    email: string;


}

// login dto
export class AdminLoginDto {
    @Trim()
    @IsEmail()
    public readonly email: string;

    @IsString()
    public readonly password: string;
}