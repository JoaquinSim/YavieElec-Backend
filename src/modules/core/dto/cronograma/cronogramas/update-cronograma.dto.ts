import { PartialType } from '@nestjs/swagger';
import { CreateCronogramaDto } from '@core/dto';

export class UpdateCronogramaDto extends PartialType(CreateCronogramaDto) {}
