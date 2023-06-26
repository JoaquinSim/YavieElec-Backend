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

  import {  CandidatosService } from '@core/services';
  import { CandidatosEntity } from '@core/entities';
  import { ResponseHttpModel } from '@shared/models';
  
  @ApiTags('Candidatos')
  @Controller('candidatos')
  export class CandidatoController {
    constructor(private candidatosService: CandidatosService) {}
  
    @ApiOperation({ summary: 'Catalogue Candidatos' })
    @Get('catalogue')
    @HttpCode(HttpStatus.OK)
    async catalogue(): Promise<ResponseHttpModel> {
      const serviceResponse = await this.candidatosService.catalogue();
  
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Catalogue Candidatos`,
        title: `Catalogue Candidatos`,
      };
    }
  
    @ApiOperation({ summary: 'Create Candidatos' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: any): Promise<ResponseHttpModel> {
      const serviceResponse = await this.candidatosService.create(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Candidato creado con Exito',
        title: 'Candidato Creado',
      };
    }
  
    @ApiOperation({ summary: 'Find All Candidatos' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: any): Promise<ResponseHttpModel> {
      const serviceResponse = await this.candidatosService.findAll(params);
  
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: 'Encuentra todos los Candidatos',
        title: 'Encontrado con Exito',
      };
    }
  
    @ApiOperation({ summary: 'Find Candidatos' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.candidatosService.findOne(id);
  
      return {
        data: serviceResponse.data,
        message: `Encontrar Candidatos`,
        title: `Exito`,
      };
    }
  
    @ApiOperation({ summary: 'Update Candidatos' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: any,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.   candidatosService.update(id, payload);
      return {
        data: serviceResponse.data,
        message: `El candidato fue Actualizado`,
        title: `Candidato Actualizado`,
      };
    }
  
    @ApiOperation({ summary: 'Delete Candidato' })
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.candidatosService.remove(id);
      return {
        data: serviceResponse.data,
        message: `Candidato Eliminado`,
        title: `Candidato Eliminado`,
      };
    }
  }
  