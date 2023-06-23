import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
// import { CreateCareerDto, UpdateCareerDto, FilterCareerDto } from '@core/dto';
import { ListasService } from '@core/services';
import { ListasEntity } from '@core/entities';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Listas')
@Controller('listas')
export class ListasController {
  constructor(private listasService: ListasService) { }

  @ApiOperation({ summary: 'Catalogue Listas' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.listasService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catalogue listas`,
      title: `Catalogue listas`,
    };
  }

  @ApiOperation({ summary: 'Create listas' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: any): Promise<ResponseHttpModel> {
    const serviceResponse = await this.listasService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'lista creado con Exito',
      title: 'lista Creado',
    };
  }

  @ApiOperation({ summary: 'Find All listas' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: any): Promise<ResponseHttpModel> {
    const serviceResponse = await this.listasService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Encuentra todos los listas',
      title: 'Encontrado con Exito',
    };
  }

  @ApiOperation({ summary: 'Find listas' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.listasService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `Encontrar Listas`,
      title: `Exito`,
    };
  }

  @ApiOperation({ summary: 'Update Listas' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.listasService.update(id, payload);
    return {
      data: serviceResponse.data,
      message: `El lista fue Actualizado`,
      title: `Lista Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Delete Lista' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.listasService.remove(id);
    return {
      data: serviceResponse.data,
      message: `Lista Eliminado`,
      title: `Lista Eliminado`,
    };
  }
}
