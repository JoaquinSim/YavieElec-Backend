import { PartialType } from '@nestjs/swagger';
import { CreateListaDto } from '@core/dto';

export class UpdateListaDto extends PartialType(CreateListaDto) {}