import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  PaginationDto,
  
} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { UsuarioEntity } from '@auth/entities';

import { UsuarioDto } from '@auth/dto';
import { RolService } from '../rol/rol.service';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject(RepositoryEnum.USUARIO_REPOSITORY)
    private usuarioRepository: Repository<UsuarioEntity>,
    private rolService: RolService
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.usuarioRepository.findAndCount({
      //relations: ['roles'],
      take: 1000,
    });

    return {
      pagination: {
        totalItems: response[1],
        limit: 10,
      },
      data: response[0],
    };
  }

  async create(payload: UsuarioDto): Promise<ServiceResponseHttpModel> {
    const newusuario = this.usuarioRepository.create(payload);

    newusuario.roles = await this.rolService.findOne(
      payload.role.id,
    );

    // newusuario.usuarios = (
    //   await this.usuarioService.findOne(payload.usuarios.id)
    // ).data;

    console.log('Creando usuario unida al cronograma: ' + newusuario);

    //newCandidato.state = await this.cataloguesService.findOne(payload.state.id);

    //newCandidato.type = await this.cataloguesService.findOne(payload.type.id);

    const usuarioCreated = await this.usuarioRepository.save(newusuario);

    return { data: usuarioCreated };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.usuarioRepository.findAndCount({
      //relations: ['role'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const usuario = await this.usuarioRepository.findOne({
    ///  relations: ['cronograma'],
      where: {
        id,
      },
    });


    if (!usuario) {
      throw new NotFoundException(
        `El usuario con ID:  ${id} no se encontro`,
      );
    }
    return { data: usuario };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(
        `El usuario con id:  ${id} no se encontro`,
      );
    }
    this.usuarioRepository.merge(usuario, payload);
    const usuarioUpdated = await this.usuarioRepository.save(usuario);
    return { data: usuarioUpdated };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException(
        `El usuario con ID:  ${id} no se encontro`,
      );
    }

    const usuarioDeleted = await this.usuarioRepository.softRemove(usuario);

    return { data: usuarioDeleted };
  }

  async removeAll(payload: UsuarioEntity[]): Promise<ServiceResponseHttpModel> {
    const usuarioDeleted = await this.usuarioRepository.softRemove(payload);
    return { data: usuarioDeleted };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<UsuarioEntity> | FindOptionsWhere<UsuarioEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ id: ILike(`%${search}%`) });
    }

    const response = await this.usuarioRepository.findAndCount({
      //relations: ['idLista', 'IdCandidato', 'IdCargo'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      pagination: { limit, totalItems: response[1] },
      data: response[0],
    };
  }
}
