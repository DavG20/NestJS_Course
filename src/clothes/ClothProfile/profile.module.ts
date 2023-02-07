import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "./profile.entity";
import { ProfileService } from "./profile.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([Profile])
    ],
    providers: [ProfileService],
    controllers: []
})



export class ProfileModule { }