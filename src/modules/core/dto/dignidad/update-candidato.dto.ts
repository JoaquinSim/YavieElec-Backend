import { PartialType } from '@nestjs/swagger';
import { CreateCandidatoDto } from '@core/dto';

export class UpdateCandidatoDto extends PartialType(CreateCandidatoDto) {}