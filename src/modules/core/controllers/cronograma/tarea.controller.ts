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
  import { CarrerasService, TareaService } from '@core/services';
  import { ResponseHttpModel } from '@shared/models';
  
  @ApiTags('tarea')
  @Controller('tarea')
  export class TareaController {
    constructor(private tareaService: TareaService) {}
  
    @ApiOperation({ summary: 'Crear tarea' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tareaService.create(payload);
  
      return {
        data: serviceResponse.data,
        message: 'La tarea a Sido creada',
        title: 'tarea Creada',
      };
    }
  
    @ApiOperation({ summary: 'Buscar todas las tareas' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tareaService.findAll();
  
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: 'Buscar todas las tareas',
        title: 'Exito',
      };
    }
  
    @ApiOperation({ summary: 'Buscar una tareas' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tareaService.findOne(id);
  
      return {
        data: serviceResponse.data,
        message: 'Buscar tarea',
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
      const serviceResponse = await this.tareaService.update(id, payload);
  
      return {
        data: serviceResponse.data,
        message: 'La tarea a sido Actualizada',
        title: 'tarea Actualizada ',
      };
    }
  
    @ApiOperation({ summary: 'Borrar tarea' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.tareaService.remove(id);
  
      return {
        data: serviceResponse.data,
        message: 'La tarea a sido Eliminada',
        title: `cronograma Eliminada`,
      };
    }
  }
  