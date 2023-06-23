import { PartialType } from '@nestjs/swagger';
import { CreateTareaDto } from '@core/dto';

export class UpdateTareaDto extends PartialType(CreateTareaDto) {}
