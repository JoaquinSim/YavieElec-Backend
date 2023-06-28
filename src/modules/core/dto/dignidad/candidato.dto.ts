import { InstitutionEntity, CatalogueEntity, CronogramaEntity, ListasEntity, CargoEntity } from '@core/entities';
import {
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
  minLengthValidationOptions,
} from '@shared/validation';

export class CandidatoDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly lista: ListasEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly cargo: CargoEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsNumber()
  id_usuario: number;
}