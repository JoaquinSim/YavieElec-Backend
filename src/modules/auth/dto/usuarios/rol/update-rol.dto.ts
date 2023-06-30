import { PartialType } from '@nestjs/swagger';
import { RolDto } from './rol.dto';

export class UpdateRolDto extends PartialType(RolDto) {}
