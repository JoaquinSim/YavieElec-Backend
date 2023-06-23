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
  import {
   //UpdateCarreraDto,
    //CreateCarreraDto,
    //FilterCarreraDto,
  } from '@core/dto';
  import { CarreraEntity, CronogramaEntity } from '@core/entities';
  import { CarrerasService, CronogramaService } from '@core/services';
  import { ResponseHttpModel } from '@shared/models';
  
  @ApiTags('Cronograma')
  @Controller('cronograma')
  export class CronogramaController {
    constructor(private cronogramaService: CronogramaService) {}
  
    @ApiOperation({ summary: 'Crear cronograma' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cronogramaService.create(payload);
  
      return {
        data: serviceResponse.data,
        message: 'La cronograma a Sido creada',
        title: 'cronograma Creada',
      };
    }
  
    @ApiOperation({ summary: 'Buscar todas las cronogramas' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cronogramaService.findAll();
  
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: 'Buscar todas las cronogramas',
        title: 'Exito',
      };
    }
  
    @ApiOperation({ summary: 'Buscar una cronogramas' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cronogramaService.findOne(id);
  
      return {
        data: serviceResponse.data,
        message: 'Buscar cronograma',
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
      const serviceResponse = await this.cronogramaService.update(id, payload);
  
      return {
        data: serviceResponse.data,
        message: 'La cronograma a sido Actualizada',
        title: 'cronograma Actualizada ',
      };
    }
  
    @ApiOperation({ summary: 'Borrar cronograma' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cronogramaService.remove(id);
  
      return {
        data: serviceResponse.data,
        message: 'La cronograma a sido Eliminada',
        title: `cronograma Eliminada`,
      };
    }

    @ApiOperation({ summary: 'Delete All cronogramas' })
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(
      @Body() payload: CronogramaEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.cronogramaService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Todos los cronogramas eliminados',
        title: 'Cronogramas eliminados',
      };
    }
  }
  