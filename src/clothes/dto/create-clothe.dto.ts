import { isNotEmpty, IsNotEmpty } from "class-validator";

export class CreateClotheDto {



@IsNotEmpty()
clothtpye :string

@IsNotEmpty()
description:string

@IsNotEmpty()
price:number

@IsNotEmpty()
origin:string

}
