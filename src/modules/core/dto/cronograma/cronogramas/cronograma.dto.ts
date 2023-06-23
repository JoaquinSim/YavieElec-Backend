import { InstitutionEntity, CatalogueEntity, CronogramaEntity } from '@core/entities';
import {
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
  minLengthValidationOptions,
} from '@shared/validation';

export class CronogramaDto {
  @IsString(isStringValidationOptions())
  @MinLength(3, minLengthValidationOptions())
  @MaxLength(10, maxLengthValidationOptions())
  nombreCronograma: string;

  @IsString(isStringValidationOptions())
  @MinLength(3, minLengthValidationOptions())
  @MaxLength(20, maxLengthValidationOptions())
  descripcionCronograma: string;

  @IsString(isStringValidationOptions())
  fechaInicio: string;

  @IsString(isStringValidationOptions())
  fechaFin: string;

  @IsBoolean()
  estado: boolean;
}
