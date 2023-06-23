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
  import { CarrerasService } from '@core/services';
  import { ResponseHttpModel } from '@shared/models';
  
  @ApiTags('Carrera')
  @Controller('carrera')
  export class CarreraController {
    constructor(private carreraService: CarrerasService) {}
  
    @ApiOperation({ summary: 'Crear Carrera' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.carreraService.create(payload);
  
      return {
        data: serviceResponse.data,
        message: 'La Carrera a Sido creada',
        title: 'Carrera Creada',
      };
    }
  
    @ApiOperation({ summary: 'Buscar todas las Carreras' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
      @Query() params: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.carreraService.findAll();
  
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: 'Buscar todas las Carreras',
        title: 'Exito',
      };
    }
  
    @ApiOperation({ summary: 'Buscar una Carreras' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.carreraService.findOne(id);
  
      return {
        data: serviceResponse.data,
        message: 'Buscar Carrera',
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
      const serviceResponse = await this.carreraService.update(id, payload);
  
      return {
        data: serviceResponse.data,
        message: 'La carrera a sido Actualizada',
        title: 'Carrera Actualizada ',
      };
    }
  
    @ApiOperation({ summary: 'Borrar Carrera' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.carreraService.remove(id);
  
      return {
        data: serviceResponse.data,
        message: 'La Carrera a sido Eliminada',
        title: `Carrera Eliminada`,
      };
    }
  }
  