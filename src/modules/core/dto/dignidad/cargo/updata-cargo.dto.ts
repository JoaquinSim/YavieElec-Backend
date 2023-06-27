import { PartialType } from '@nestjs/swagger';
import { CreateCargoDto } from '@core/dto';

export class UpdateCargoDto extends PartialType(CreateCargoDto) {}