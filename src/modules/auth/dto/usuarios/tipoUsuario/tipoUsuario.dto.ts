import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  MinLength,
  IsEmail,
  MaxLength,
  IsDate,
} from 'class-validator';
import {
  isBooleanValidationOptions,
  isEmailValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
  minLengthValidationOptions,
} from '@shared/validation';
import { CatalogueEntity } from '@core/entities';
import { RoleEntity, UsuarioEntity } from '@auth/entities';

export class TipoUsuarioDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly usuario: UsuarioEntity;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  nombreTipoUsuario: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  descripcionTipoUsuario: string;
}
