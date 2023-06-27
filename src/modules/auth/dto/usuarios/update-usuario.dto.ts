import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from '@auth/dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}