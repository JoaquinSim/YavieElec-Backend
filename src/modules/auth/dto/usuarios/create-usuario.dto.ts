import { PickType } from '@nestjs/swagger';
import { UsuarioDto } from '@auth/dto';

export class CreateUsuarioDto extends PickType(UsuarioDto, [
  'cedula',
  'nombre',
  'apellido',
  'semestre',
  'carrera',
  'correo',
  'clave',
  'estado',
  'estadoVoto',
]) {}
