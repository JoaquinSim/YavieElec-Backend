import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateCronogramaDto,
  // CreateCandidatosListaDto,
  // UpdateCandidatoDto,
  // FilterCandidatoListaDto,
  PaginationDto,
} from '@core/dto';
import { CandidatosEntity, CronogramaEntity } from '@core/entities';
import { InstitutionsService, CataloguesService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class CronogramaService {
  constructor(
    @Inject(RepositoryEnum.CRONOGRAMA_REPOSITORY)
    private cronogramaRepository: Repository<CronogramaEntity>,
    //
    private cataloguesService: CataloguesService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.cronogramaRepository.findAndCount({
     // relations: ['idLista', 'IdCandidato', 'IdCargo'],
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

  async create(payload: CreateCronogramaDto): Promise<ServiceResponseHttpModel> {
    const newCronograma = this.cronogramaRepository.create(payload);

    // newCronograma.tareas = await this.tareaService.findOne(
    //   payload.institution.id,
    // );

    // newCandidato.modality = await this.cataloguesService.findOne(
    //   payload.modality.id,
    // );

    // newCandidato.state = await this.cataloguesService.findOne(payload.state.id);

    //newCandidato.type = await this.cataloguesService.findOne(payload.type.id);

    const cronogramaCreated = await this.cronogramaRepository.save(newCronograma);
    

    return { data: cronogramaCreated };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.cronogramaRepository.findAndCount({
      //relations: ['idLista', 'IdCandidato', 'IdCargo'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id_cronograma: string): Promise<any> {
    const cronograma = await this.cronogramaRepository.findOne({
      where: {
        id_cronograma,
      },
    });

    if (!cronograma) {
      throw new NotFoundException(`El CRONOGRAMA con ID:  ${id_cronograma} no se encontro`);
    }
    return { data: cronograma };
  }

  async update(
    id_cronograma: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const cronograma = await this.cronogramaRepository.findOneBy({ id_cronograma });
    if (!cronograma) {
      throw new NotFoundException(`El cronograma con id:  ${id_cronograma} no se encontro`);
    }
    this.cronogramaRepository.merge(cronograma, payload);
    const cronogramaUpdated = await this.cronogramaRepository.save(cronograma);
    return { data: cronogramaUpdated };
  }

  async remove(id_cronograma: string): Promise<ServiceResponseHttpModel> {
    const cronograma = await this.cronogramaRepository.findOneBy({ id_cronograma });

    if (!cronograma) {
      throw new NotFoundException(`El Cronograma con ID:  ${id_cronograma} no se encontro`);
    }

    const cronogramaDeleted = await this.cronogramaRepository.softRemove(cronograma);

    return { data: cronogramaDeleted };
  }

  async removeAll(payload: CronogramaEntity[]): Promise<ServiceResponseHttpModel> {
    const cronogramaDeleted = await this.cronogramaRepository.softRemove(payload);
    return { data: cronogramaDeleted };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CronogramaEntity>
      | FindOptionsWhere<CronogramaEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ id_cronograma: ILike(`%${search}%`) });
    }

    const response = await this.cronogramaRepository.findAndCount({
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
