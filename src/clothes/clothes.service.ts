import { Injectable, Req, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



import { Cloth } from './entities/clothe.entity';

import { ProfileService } from './ClothProfile/profile.service';
import { UpdateClothDto } from './dto/update-clothe.dto';
import { CreateClothDto } from './dto/create-clothe.dto';

@Injectable()
export class ClothesService {
  @InjectRepository(Cloth)
  private readonly clothRepository: Repository<Cloth>;

  private readonly profileService: ProfileService;


 async create(createClotheDto: CreateClothDto) {
    return await this.clothRepository.save(createClotheDto); 
  }

  findAll() {
    return `This action returns all clothes`;
  }

 async findOne(id: number) {
    return  await this.clothRepository.findOneBy({id});
  }

 async update(id: number, updateClotheDto: UpdateClothDto) {
    return await this.clothRepository.save(updateClotheDto);
  }

  async remove(id: number) {
    return await this.clothRepository.delete(id);
  }




  // add avator or profile for cloth

  async UploadProfile(body: UpdateClothDto, buffer: Buffer, fileName: string) {
    const avator = await this.profileService.UploadProfile(buffer, fileName);
    await this.clothRepository.update(body.id, {
      profile_id: avator.id
    });
    return avator;

  }




}
