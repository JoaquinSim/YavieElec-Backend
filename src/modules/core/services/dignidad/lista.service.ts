import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  // CreateCargoDto,
  // UpdateCargoDto,
  // FilterCargoDto,
  PaginationDto,
} from '@core/dto';
import { ListasEntity } from '@core/entities';
import { InstitutionsService, CataloguesService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { any } from 'joi';

@Injectable()
export class ListasService {
  constructor(
    @Inject(RepositoryEnum.LISTAS_REPOSITORY)
    private listasRepository: Repository<ListasEntity>,
    private institutionService: InstitutionsService,
    private cataloguesService: CataloguesService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.listasRepository.findAndCount({
      //relations: ['IdLista', 'nombre', 'lista'],
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
    const newListas = this.listasRepository.create(payload);

    // newCareer.institution = await this.institutionService.findOne(
    //   payload.institution.id,
    // );

    // newListas.modality = await this.cataloguesService.findOne(
    //   payload.modality.id,
    // );

    // newListas.state = await this.cataloguesService.findOne(payload.state.id);

    //newCandidato.type = await this.cataloguesService.findOne(payload.type.id);

    const listasCreated = await this.listasRepository.save(newListas);

    return { data: listasCreated };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.listasRepository.findAndCount({
      //relations: ['IdListas', 'nombre', 'listas'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const listas = await this.listasRepository.findOne({
      //relations: ['IdListas', 'nombre', 'listas'],
      where: {
        id,
      },
    });

    if (!listas) {
      throw new NotFoundException(`La lista con ID:  ${id} no se encontro`);
    }
    return { data: listas };
  }

  async update(
    id: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const listas = await this.listasRepository.findOneBy({ id });
    if (!listas) {
      throw new NotFoundException(`la lista con id:  ${id} no se encontro`);
    }
    this.listasRepository.merge(listas, payload);
    const listasUpdated = await this.listasRepository.save(listas);
    return { data: listasUpdated };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const listas = await this.listasRepository.findOneBy({ id });

    if (!listas) {
      throw new NotFoundException(`La lista con ID:  ${id} no se encontro`);
    }

    const listasDeleted = await this.listasRepository.softRemove(listas);

    return { data: listasDeleted };
  }

  async removeAll(payload: ListasEntity[]): Promise<ServiceResponseHttpModel> {
    const listasDeleted = await this.listasRepository.softRemove(payload);
    return { data: listasDeleted };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ListasEntity>
      | FindOptionsWhere<ListasEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ id_lista: ILike(`%${search}%`) });
      where.push({ nombre: ILike(`%${search}%`) });
      where.push({ propuesta: ILike(`%${search}%`) });
    }

    const response = await this.listasRepository.findAndCount({
      relations: ['IdListas', 'nombre', 'listas'],
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