import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  MinLength,
  IsEmail,
  MaxLength,
  IsDate,
  IsNumber,
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
import { RolEntity, RoleEntity } from '@auth/entities';

export class UsuarioDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly role: RolEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  roles: string;
  
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsNumber()
  cedula: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  nombre: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  apellido: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  semestre: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  carrera: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  correo: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  clave: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean()
  estado: boolean;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean()
  estadoVoto: boolean;
}
