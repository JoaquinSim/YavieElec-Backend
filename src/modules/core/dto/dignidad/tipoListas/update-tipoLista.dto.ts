import { PartialType } from '@nestjs/swagger';
import { CreateTipoListaDto } from '@core/dto';

export class UpdatetipoListaDto extends PartialType(CreateTipoListaDto) {}