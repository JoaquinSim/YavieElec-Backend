import { InstitutionEntity, CatalogueEntity, CronogramaEntity, ListasEntity, TipoListaEntity } from '@core/entities';
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

export class ListaDto {
  @IsString(isStringValidationOptions())
  @IsNotEmpty()
  slogan: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty()
  propuesta: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty()
  periodo_lectivo: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  nro_lista: number;

  @IsString(isStringValidationOptions())
  @IsNotEmpty()
  color: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty()
  logo: string;

  @IsNotEmpty()
  estado: boolean;

  @IsNumber()
  votos: number;

 // @IsNotEmpty(isNotEmptyValidationOptions())
 // readonly tipoLista: TipoListaEntity;
}
