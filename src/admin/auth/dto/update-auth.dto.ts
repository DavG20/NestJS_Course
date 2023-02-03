import { PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAdminDto) {}
