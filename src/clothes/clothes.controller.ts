import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { CreateClothDto, } from './dto/create-clothe.dto';
import { UpdateClothDto } from './dto/update-clothe.dto';

import { Express } from 'express';



@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) { }

  @Post()
  create(@Body() createClothDto: CreateClothDto) {
    return this.clothesService.create(createClothDto);
  }

  @Get()
  findAll() {
    return this.clothesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clothesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClotheDto: UpdateClothDto) {
    return this.clothesService.update(+id, updateClotheDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clothesService.remove(+id);
  }



  @Post('profile')

  async addAvatar(@Body() body: UpdateClothDto, @UploadedFile() file: Express.Multer.File) {
    const cloth = await this.clothesService.findOne(+body.id);

    if (!cloth) {
      throw new HttpException("invalid input ", HttpStatus.BAD_REQUEST);
    }

    let fileName: string = "lisada" + cloth.id;
    return await this.clothesService.UploadProfile(body, file.buffer, fileName);
  }
}
