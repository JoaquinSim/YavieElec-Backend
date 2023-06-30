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
  
  export class RolDto {
    @IsOptional()
    readonly usuarios: UsuarioEntity;

    @IsString(isStringValidationOptions())
    @IsNotEmpty(isNotEmptyValidationOptions())
    nombreRol: string;

    @IsString(isStringValidationOptions())
    @IsNotEmpty(isNotEmptyValidationOptions())
    descripcionRol: string;
    
  }
  