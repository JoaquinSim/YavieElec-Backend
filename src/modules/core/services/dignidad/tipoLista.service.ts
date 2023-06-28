import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  // CreateCandidatosListaDto,
  // UpdateCandidatoDto,
  // FilterCandidatoListaDto,
  PaginationDto,
} from '@core/dto';
import { TipoListaEntity } from '@core/entities';
import { CronogramaService, CataloguesService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { any } from 'joi';

@Injectable()
export class TipoListaService {
  constructor(
    @Inject(RepositoryEnum.TIPO_LISTA_REPOSITORY)
    private tipoListaRepository: Repository<TipoListaEntity>,
    private cronogramaService: CronogramaService,
    private cataloguesService: CataloguesService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.tipoListaRepository.findAndCount({
      relations: ['nombreCronograma'],
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
    const newtipoLista = this.tipoListaRepository.create(payload);

    // newCandidato.modality = await this.cataloguesService.findOne(
    //   payload.modality.id,
    // );

    // newtipoLista.nombreCronograma = await this.cronogramaService.findOne(
    //   payload.cronograma.nombreCronograma
    // );

    // console.log(newtipoLista.nombreCronograma);

    //newCandidato.state = await this.cataloguesService.findOne(payload.state.id);

    //newCandidato.type = await this.cataloguesService.findOne(payload.type.id);

    const tipoListaCreated = await this.tipoListaRepository.save(newtipoLista);

    return { data: tipoListaCreated };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.tipoListaRepository.findAndCount({
      // relations: ['nombreCronograma'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id_tipoLista: string): Promise<any> {
    const tipoLista = await this.tipoListaRepository.findOne({
      // relations: ['nombreCronograma'],
      where: {
        id_tipoLista,
      },
    });

    // console.log(tipoLista.nombreCronograma );

    if (!tipoLista) {
      throw new NotFoundException(
        `El tipoLista con ID:  ${id_tipoLista} no se encontro`,
      );
    }
    return { data: tipoLista };
  }

  async update(
    id_tipoLista: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const tipoLista = await this.tipoListaRepository.findOneBy({
      id_tipoLista,
    });
    if (!tipoLista) {
      throw new NotFoundException(
        `El tipoLista con id:  ${id_tipoLista} no se encontro`,
      );
    }
    this.tipoListaRepository.merge(tipoLista, payload);
    const tipoListaUpdated = await this.tipoListaRepository.save(tipoLista);
    return { data: tipoListaUpdated };
  }

  async remove(id_tipoLista: string): Promise<ServiceResponseHttpModel> {
    const tipoLista = await this.tipoListaRepository.findOneBy({
      id_tipoLista,
    });

    if (!tipoLista) {
      throw new NotFoundException(
        `El tipoLista con ID:  ${id_tipoLista} no se encontro`,
      );
    }

    const tipoListaDeleted = await this.tipoListaRepository.softRemove(
      tipoLista,
    );

    return { data: tipoListaDeleted };
  }

  async removeAll(
    payload: TipoListaEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const tipoListaDeleted = await this.tipoListaRepository.softRemove(payload);
    return { data: tipoListaDeleted };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<TipoListaEntity>
      | FindOptionsWhere<TipoListaEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ id_tipoLista: ILike(`%${search}%`) });
    }

    const response = await this.tipoListaRepository.findAndCount({
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
