import { IsNotEmpty, IsString } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@shared/validation';

export class LoginDto {
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  correo: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty()
  clave: string;
}
