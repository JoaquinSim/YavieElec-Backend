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
} from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
  minLengthValidationOptions,
} from '@shared/validation';

export class TareaDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly cronograma: CronogramaEntity;

  @IsString(isStringValidationOptions())
  @MinLength(3, minLengthValidationOptions())
  @MaxLength(10, maxLengthValidationOptions())
  nombreTarea: string;

  @IsString(isStringValidationOptions())
  @MinLength(3, minLengthValidationOptions())
  @MaxLength(20, maxLengthValidationOptions())
  descripcionTarea: string;
}
