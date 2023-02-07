import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile } from "./profile.entity";



@Injectable()

export class ProfileService {
    @InjectRepository(Profile)

    private profileRepository: Repository<Profile>;


    // upload cloth profile avator using filename and  buffer or blob

    async UploadProfile(buffer: Buffer, fileName: string) {
        const newProfile = this.profileRepository.create({ fileName, data: buffer })

        await this.profileRepository.save(newProfile);
        return newProfile;
    }



    
    async getProfileById(id: number) {
        const profile = await this.profileRepository.findOneBy({ id });

        if (!profile) {
            throw new HttpException("Can't get image", HttpStatus.BAD_REQUEST);
        }

        return profile;
    }

}
