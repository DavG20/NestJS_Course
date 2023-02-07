import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateClothDto {

    @IsNotEmpty()
    @IsString()
    clothtpye: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    
    origin: string

}

