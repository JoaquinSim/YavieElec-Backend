import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { CargosService } from '@core/services';
import { CargoEntity } from '@core/entities';
//import { CargoTypeEnum } from '@shared/enums';
import { CreateCargoDto, UpdateCargoDto } from '@core/dto';

@ApiTags('cargo')
@Controller('cargo')
export class CargoController {
  constructor(private cargoService: CargosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCargoDto) {
    const data = await this.cargoService.create(payload);

    return {
      data,
      message: 'Creado',
    };
  }

  @ApiOperation({ summary: 'List all catalogues cargo' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue() {
    const response = await this.cargoService.catalogue();
    return {
      data: response.data,
      message: `cargo`,
      title: `Cargo`,
    } as ResponseHttpModel;
  }

  @ApiOperation({ summary: 'List of cargos' })
  // @Roles(RoleEnum.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: any) {
    const response = await this.cargoService.findAll(params);
    return {
      data: response.data,
      pagination: response.pagination,
      message: `index`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.cargoService.findOne(id);
    return {
      data,
      message: `show ${id}`,
      title: `Exito`,
    } as ResponseHttpModel;
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateCargoDto,
  ) {
    const data = await this.cargoService.update(id, payload);

    return {
      data: data,
      message: `Cargo Actualizado ${id}`,
      title: `Actualizado con Exito`,
    } as ResponseHttpModel;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.cargoService.remove(id);

    return {
      data,
      message: `Cargo Eliminado ${id}`,
      title: `Eliminado con Exito`,
    };
  }
}
