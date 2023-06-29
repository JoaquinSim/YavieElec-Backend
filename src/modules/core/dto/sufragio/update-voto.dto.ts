import { PartialType } from '@nestjs/swagger';
import { CreateVotoDto } from '@core/dto';

export class UpdateVotoDto extends PartialType(CreateVotoDto) {}
