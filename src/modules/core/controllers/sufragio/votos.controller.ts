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
import { VotosService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Votos')
@Controller('votos')
export class VotosController {
  constructor(private votosService: VotosService) { }

  @ApiOperation({ summary: 'Catalogue Votos' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.votosService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catalogue Votos`,
      title: `Catalogue Votos`,
    };
  }

  @ApiOperation({ summary: 'Create Votos' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: any): Promise<ResponseHttpModel> {
    const serviceResponse = await this.votosService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Voto creado con Exito',
      title: 'Voto Creado',
    };
  }

  @ApiOperation({ summary: 'Find All Votos' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: any): Promise<ResponseHttpModel> {
    const serviceResponse = await this.votosService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Encuentra todos los Votos',
      title: 'Encontrado con Exito',
    };
  }

  @ApiOperation({ summary: 'Find Votos' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.votosService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `Encontrar Votos`,
      title: `Exito`,
    };
  }

  @ApiOperation({ summary: 'Update Votos' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: any,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.votosService.update(id, payload);
    return {
      data: serviceResponse.data,
      message: `El Voto fue Actualizado`,
      title: `Voto Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Delete Votos' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.votosService.remove(id);
    return {
      data: serviceResponse.data,
      message: `Voto Eliminado`,
      title: `Voto Eliminado`,
    };
  }
}