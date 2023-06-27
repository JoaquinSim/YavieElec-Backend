import { PartialType } from '@nestjs/swagger';
import { CreateTipoUsuarioDto } from '@auth/dto';

export class UpdateTipoUsuarioDto extends PartialType(CreateTipoUsuarioDto) {}