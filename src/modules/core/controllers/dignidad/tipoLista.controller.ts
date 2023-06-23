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
  import { ApiTags, ApiOperation } from '@nestjs/swagger';
  import {
   //UpdateCarreraDto,
    //CreateCarreraDto,
    //FilterCarreraDto,
  } from '@core/dto';
  import { CarreraEntity } from '@core/entities';
  import { CarrerasService, TipoListaService } from '@core/services';
  import { ResponseHttpModel } from '@shared/models';
  
  @ApiTags('Tipo_lista')
  @Controller('tipoListas')
  export class TipoListaController {
    constructor(private tipoListaService: TipoListaService) {}
  
    @ApiOperation({ summary: 'Crear tipoLista' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tipoListaService.create(payload);
  
      return {
        data: serviceResponse.data,
        message: 'La tipoLista a Sido creada',
        title: 'tipoLista Creada',
      };
    }
  
    @ApiOperation({ summary: 'Buscar todas las tipoListas' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tipoListaService.findAll();
  
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: 'Buscar todas las tipoListas',
        title: 'Exito',
      };
    }
  
    @ApiOperation({ summary: 'Buscar una tipoListas' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tipoListaService.findOne(id);
  
      return {
        data: serviceResponse.data,
        message: 'Buscar tipoLista',
        title: `Exito`,
      };
    }
  
    @ApiOperation({ summary: 'Actualizar Cerrera' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tipoListaService.update(id, payload);
  
      return {
        data: serviceResponse.data,
        message: 'La tipoLista a sido Actualizada',
        title: 'tipoLista Actualizada ',
      };
    }
  
    @ApiOperation({ summary: 'Borrar tipoLista' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tipoListaService.remove(id);
  
      return {
        data: serviceResponse.data,
        message: 'La tipoLista a sido Eliminada',
        title: `cronograma Eliminada`,
      };
    }
  }
  