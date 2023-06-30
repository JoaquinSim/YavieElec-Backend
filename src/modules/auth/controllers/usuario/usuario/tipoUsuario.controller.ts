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
import { UsuarioEntity } from '@auth/entities';
import { TipoUsuarioService } from '@auth/services';
import { ResponseHttpModel } from '@shared/models';
import { CreateTipoUsuarioDto, UpdateTipoUsuarioDto } from '@auth/dto';

@ApiTags('Tipo_Usuario')
@Controller('tipoUsuario')
export class TipoUsuarioController {
  constructor(private tipoUsuarioService: TipoUsuarioService) {}

  @ApiOperation({ summary: 'Crear usuario' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateTipoUsuarioDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.tipoUsuarioService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'La tarea a Sido creada',
      title: 'tarea Creada',
    };
  }

  @ApiOperation({ summary: 'Lista de Usuarios' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: any): Promise<ResponseHttpModel> {
    const serviceResponse = await this.tipoUsuarioService.findAll();
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Exito',
    };
  }

  @ApiOperation({ summary: 'Ver Usuarios' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.tipoUsuarioService.findOne(id);
    return {
      data: serviceResponse.data,
      message: `show ${id}`,
      title: `Exito`,
    };
  }

  @ApiOperation({ summary: 'Actualizar Usuario' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateTipoUsuarioDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.tipoUsuarioService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Usuario Actualizado ${id}`,
      title: `Usuario Actualizado con Exito`,
    };
  }

  @ApiOperation({ summary: 'Eliminar Usuario' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.tipoUsuarioService.remove(id);
    return {
      data: serviceResponse.data,
      message: `Usuario Eliminado ${id}`,
      title: `Usuario Eliminado con Exito`,
    };
  }
}
