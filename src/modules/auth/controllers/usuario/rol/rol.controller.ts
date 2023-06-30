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
  import { ResponseHttpModel } from '@shared/models';
  import { CreateRolDto, UpdateRolDto } from '@auth/dto';
import { RolService } from '@auth/services';
  
  @ApiTags('Roles')
  @Controller('roles')
  export class RolController {
    constructor(private rolService: RolService) {}
  
    @ApiOperation({ summary: 'Crear rol' })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateRolDto): Promise<ResponseHttpModel> {
      const serviceResponse = await this.rolService.create(payload);
  
      return {
        data: serviceResponse.data,
        message: 'La tarea a Sido creada',
        title: 'tarea Creada',
      };
    }
  
    @ApiOperation({ summary: 'Lista de rols' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: any): Promise<ResponseHttpModel> {
      const serviceResponse = await this.rolService.findAll();
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `index`,
        title: 'Exito',
      };
    }
  
    @ApiOperation({ summary: 'Ver rols' })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.rolService.findOne(id);
      return {
        data: serviceResponse.data,
        message: `show ${id}`,
        title: `Exito`,
      };
    }
  
    @ApiOperation({ summary: 'Actualizar rol' })
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() payload: UpdateRolDto,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.rolService.update(id, payload);
  
      return {
        data: serviceResponse.data,
        message: `rol Actualizado ${id}`,
        title: `rol Actualizado con Exito`,
      };
    }
  
    @ApiOperation({ summary: 'Eliminar rol' })
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(
      @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.rolService.remove(id);
      return {
        data: serviceResponse.data,
        message: `rol Eliminado ${id}`,
        title: `rol Eliminado con Exito`,
      };
    }
  }
  