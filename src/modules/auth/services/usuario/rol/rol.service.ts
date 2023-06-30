import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  PaginationDto,
  
} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { RolEntity } from '@auth/entities';
import { RolDto } from '@auth/dto';
import { UsuarioService } from '@auth/services';

@Injectable()
export class RolService {
  constructor(
    @Inject(RepositoryEnum.ROL_REPOSITORY)
    private rolRepository: Repository<RolEntity>,
  // private usuarioService: UsuarioService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.rolRepository.findAndCount({
      //relations: ['nombreCronograma'],
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

  async create(payload: RolDto): Promise<ServiceResponseHttpModel> {
    const newRol = this.rolRepository.create(payload);

    // newCandidato.modality = await this.cataloguesService.findOne(
    //   payload.modality.id,
    // );

    // newRol.usuarios = (await this.usuarioService.findOne(payload.usuarios.id)).data;

    console.log('Creando tarea unida al cronograma: ' + newRol);

    //newCandidato.state = await this.cataloguesService.findOne(payload.state.id);

    //newCandidato.type = await this.cataloguesService.findOne(payload.type.id);

    const rolCreated = await this.rolRepository.save(newRol);

    return { data: rolCreated };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.rolRepository.findAndCount({
     relations: ['usuarios'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const rol = await this.rolRepository.findOne({
    ///  relations: ['cronograma'],
      where: {
        id,
      },
    });


    if (!rol) {
      throw new NotFoundException(
        `El rol con ID:  ${id} no se encontro`,
      );
    }
    return { data: rol };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const rol = await this.rolRepository.findOneBy({ id });
    if (!rol) {
      throw new NotFoundException(
        `El rol con id:  ${id} no se encontro`,
      );
    }
    this.rolRepository.merge(rol, payload);
    const rolUpdated = await this.rolRepository.save(rol);
    return { data: rolUpdated };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const rol = await this.rolRepository.findOneBy({ id });

    if (!rol) {
      throw new NotFoundException(
        `El rol con ID:  ${id} no se encontro`,
      );
    }

    const rolDeleted = await this.rolRepository.softRemove(rol);

    return { data: rolDeleted };
  }

  async removeAll(payload: RolEntity[]): Promise<ServiceResponseHttpModel> {
    const rolDeleted = await this.rolRepository.softRemove(payload);
    return { data: rolDeleted };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<RolEntity> | FindOptionsWhere<RolEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ id: ILike(`%${search}%`) });
    }

    const response = await this.rolRepository.findAndCount({
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
