import { PickType } from '@nestjs/swagger';
import { TipoUsuarioDto } from '@auth/dto';

export class CreateTipoUsuarioDto extends PickType(TipoUsuarioDto, [
  'email',
  'lastname',
  'name',
  'password',
  'passwordChanged',
  'roles',
  'username',
]) {}
