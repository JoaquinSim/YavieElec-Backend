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
import { UsuarioService } from '@auth/services';
import { ResponseHttpModel } from '@shared/models';
import { CreateUsuarioDto } from '../../../dto/usuarios/create-usuario.dto';
import { UpdateUsuarioDto } from '@auth/dto';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @ApiOperation({ summary: 'Crear usuario' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUsuarioDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.usuarioService.create(payload);

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
    const serviceResponse = await this.usuarioService.findAll();
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
    const serviceResponse = await this.usuarioService.findOne(id);
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
    @Body() payload: UpdateUsuarioDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.usuarioService.update(id, payload);

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
    const serviceResponse = await this.usuarioService.remove(id);
    return {
      data: serviceResponse.data,
      message: `Usuario Eliminado ${id}`,
      title: `Usuario Eliminado con Exito`,
    };
  }
}
