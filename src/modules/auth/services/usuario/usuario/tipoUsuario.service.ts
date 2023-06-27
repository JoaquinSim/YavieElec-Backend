import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  //   CreateTipousuarioDto,
  //   UpdateTipousuarioDto,
  FilterCareerDto,
  PaginationDto,
} from '@core/dto';
import { TipoUsuarioEntity } from '@auth/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class TipoUsuarioService {
  constructor(
    @Inject(RepositoryEnum.TIPO_USUARIO_REPOSITORY)
    private tipousuarioRepository: Repository<TipoUsuarioEntity>,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.tipousuarioRepository.findAndCount({
      //relations: ['institution', 'modality', 'state', 'type'],
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

  async create(payload: any): Promise<ServiceResponseHttpModel> {
    const newTipousuario = this.tipousuarioRepository.create(payload);

    return { data: newTipousuario };
  }

  async findAll(): Promise<ServiceResponseHttpModel> {
    //All
    const data = await this.tipousuarioRepository.findAndCount({
      // relations: ['institution', 'modality', 'state', 'type'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const usuario = await this.tipousuarioRepository.findOne({
      //relations: ['institution', 'modality', 'state', 'type'],
      where: {
        id,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`La usuario con id:  ${id} no se encontro`);
    }
    return { data: usuario };
  }

  async update(id: string, payload: any): Promise<ServiceResponseHttpModel> {
    const usuario = await this.tipousuarioRepository.findOneBy({
      id,
    });
    if (!usuario) {
      throw new NotFoundException(`La usuario con id:  ${id} no se encontro`);
    }
    this.tipousuarioRepository.merge(usuario, payload);
    const tipousuarioUpdated = await this.tipousuarioRepository.save(usuario);
    return { data: tipousuarioUpdated };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const usuario = await this.tipousuarioRepository.findOneBy({
      id,
    });

    if (!usuario) {
      throw new NotFoundException(
        `El tipo de usuario con id:  ${id} no se encontro`,
      );
    }

    const tiposusuarioDeleted = await this.tipousuarioRepository.softRemove(
      usuario,
    );

    return { data: tiposusuarioDeleted };
  }

  async removeAll(
    payload: TipoUsuarioEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const usuarioDeleted = await this.tipousuarioRepository.softRemove(payload);
    return { data: usuarioDeleted };
  }
}
