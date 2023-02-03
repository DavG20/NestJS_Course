import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './users/entities';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

import { ClothesModule } from './clothes/clothes.module';
import { AuthModule } from './auth/auth.module';
import { AuthAdminModule } from './admin/auth/authadmin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ClothesModule,
    AuthModule,
    AuthAdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
