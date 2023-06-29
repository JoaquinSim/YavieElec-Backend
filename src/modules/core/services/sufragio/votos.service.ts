import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateVotoDto,
  // CreateCargoDto,
  // UpdateCargoDto,
  // FilterCargoDto,
  PaginationDto,
} from '@core/dto';
import { VotosEntity } from '@core/entities';
import { InstitutionsService, CataloguesService, ListasService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { any } from 'joi';

@Injectable()
export class VotosService {
  constructor(
    @Inject(RepositoryEnum.VOTO_REPOSRITORY)
    private votosRepository: Repository<VotosEntity>,
    private listaService: ListasService,
    private cataloguesService: CataloguesService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.votosRepository.findAndCount({
      // relations: ['IdVoto', 'nombre', 'voto'],
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

  async create(payload: CreateVotoDto): Promise<ServiceResponseHttpModel> {
    const newVotos = this.votosRepository.create(payload);


    newVotos.lista = await this.listaService.findOne(
      payload.lista.id,
    );

    // newVotos.state = await this.cataloguesService.findOne(payload.state.id);

    //newCandidato.type = await this.cataloguesService.findOne(payload.type.id);

    const votosCreated = await this.votosRepository.save(newVotos);

    return { data: votosCreated };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.votosRepository.findAndCount({
      // relations: ['IdVotos', 'nombre', 'votos'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const votos = await this.votosRepository.findOne({
      //  relations: ['IdVotos', 'nombre', 'votos'],
      where: {
        id,
      },
    });

    if (!votos) {
      throw new NotFoundException(`El voto con ID:  ${id} no se encontro`);
    }
    return { data: votos };
  }

  async update(id: string, payload: any): Promise<ServiceResponseHttpModel> {
    const votos = await this.votosRepository.findOneBy({ id });
    if (!votos) {
      throw new NotFoundException(`el voto con id:  ${id} no se encontro`);
    }
    this.votosRepository.merge(votos, payload);
    const votosUpdated = await this.votosRepository.save(votos);
    return { data: votosUpdated };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const votos = await this.votosRepository.findOneBy({ id });

    if (!votos) {
      throw new NotFoundException(`El voto con ID:  ${id} no se encontro`);
    }

    const votosDeleted = await this.votosRepository.softRemove(votos);

    return { data: votosDeleted };
  }

  async removeAll(payload: VotosEntity[]): Promise<ServiceResponseHttpModel> {
    const votosDeleted = await this.votosRepository.softRemove(payload);
    return { data: votosDeleted };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<VotosEntity> | FindOptionsWhere<VotosEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ id: ILike(`%${search}%`) });
      where.push({ tipo_voto: ILike(`%${search}%`) });
    }

    const response = await this.votosRepository.findAndCount({
      relations: ['IdVotos', 'nombre', 'votos'],
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
