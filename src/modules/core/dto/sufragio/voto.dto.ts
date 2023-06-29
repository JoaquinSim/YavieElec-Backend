import {
    InstitutionEntity,
    CatalogueEntity,
    CronogramaEntity,
    ListasEntity,
  } from '@core/entities';
  import {
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
    IsNotEmpty,
  } from 'class-validator';
  import {
    isNotEmptyValidationOptions,
    isStringValidationOptions,
    maxLengthValidationOptions,
    minLengthValidationOptions,
  } from '@shared/validation';
  
  export class VotoDto {
    @IsNotEmpty(isNotEmptyValidationOptions())
    readonly lista: ListasEntity;
  
    @IsString(isStringValidationOptions())
    @MinLength(3, minLengthValidationOptions())
    @MaxLength(10, maxLengthValidationOptions())
    tipo_voto: string;
  
  }
  