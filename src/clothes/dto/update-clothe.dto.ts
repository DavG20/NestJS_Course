import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateClothDto } from './create-clothe.dto';


export class UpdateClothDto {
    @IsNumber()
    @IsNotEmpty()
    id: number
}
