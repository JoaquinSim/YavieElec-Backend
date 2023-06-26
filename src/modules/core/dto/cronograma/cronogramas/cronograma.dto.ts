import {
  InstitutionEntity,
  CatalogueEntity,
  CronogramaEntity,
} from '@core/entities';
import {
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsDate,
} from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
  minLengthValidationOptions,
} from '@shared/validation';

export class CronogramaDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  @MinLength(3, minLengthValidationOptions())
  @MaxLength(10, maxLengthValidationOptions())
  nombreCronograma: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  @MinLength(3, minLengthValidationOptions())
  @MaxLength(20, maxLengthValidationOptions())
  descripcionCronograma: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  fechaInicio: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  fechaFin: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean()
  estado: boolean;
}
