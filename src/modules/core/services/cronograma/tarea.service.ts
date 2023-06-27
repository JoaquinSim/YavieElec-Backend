import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  // CreateCandidatosListaDto,
  // UpdateCandidatoDto,
  // FilterCandidatoListaDto,
  PaginationDto,
  TareaDto,
} from '@core/dto';
import { TareaEntity } from '@core/entities';
import { CronogramaService, CataloguesService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class TareaService {
  constructor(
    @Inject(RepositoryEnum.TAREA_REPOSITORY)
    private tareaRepository: Repository<TareaEntity>,
    private cronogramaService: CronogramaService,
    private cataloguesService: CataloguesService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.tareaRepository.findAndCount({
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

  async create(payload: TareaDto): Promise<ServiceResponseHttpModel> {
    const newtarea = this.tareaRepository.create(payload);

    // newCandidato.modality = await this.cataloguesService.findOne(
    //   payload.modality.id,
    // );

    newtarea.cronograma = (
      await this.cronogramaService.findOne(payload.cronograma.id_cronograma)
    ).data;

    console.log('Creando tarea unida al cronograma: ' + newtarea);

    //newCandidato.state = await this.cataloguesService.findOne(payload.state.id);

    //newCandidato.type = await this.cataloguesService.findOne(payload.type.id);

    const tareaCreated = await this.tareaRepository.save(newtarea);

    return { data: tareaCreated };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.tareaRepository.findAndCount({
      relations: ['cronograma'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id_tarea: string): Promise<ServiceResponseHttpModel> {
    const tarea = await this.tareaRepository.findOne({
      relations: ['cronograma'],
      where: {
        id_tarea,
      },
    });

    console.log('Cronograma unida a la tarea: ' + tarea.cronograma);

    if (!tarea) {
      throw new NotFoundException(
        `El tarea con ID:  ${id_tarea} no se encontro`,
      );
    }
    return { data: tarea };
  }

  async update(
    id_tarea: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const tarea = await this.tareaRepository.findOneBy({ id_tarea });
    if (!tarea) {
      throw new NotFoundException(
        `El tarea con id:  ${id_tarea} no se encontro`,
      );
    }
    this.tareaRepository.merge(tarea, payload);
    const tareaUpdated = await this.tareaRepository.save(tarea);
    return { data: tareaUpdated };
  }

  async remove(id_tarea: string): Promise<ServiceResponseHttpModel> {
    const tarea = await this.tareaRepository.findOneBy({ id_tarea });

    if (!tarea) {
      throw new NotFoundException(
        `El tarea con ID:  ${id_tarea} no se encontro`,
      );
    }

    const tareaDeleted = await this.tareaRepository.softRemove(tarea);

    return { data: tareaDeleted };
  }

  async removeAll(payload: TareaEntity[]): Promise<ServiceResponseHttpModel> {
    const tareaDeleted = await this.tareaRepository.softRemove(payload);
    return { data: tareaDeleted };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<TareaEntity> | FindOptionsWhere<TareaEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ id_tarea: ILike(`%${search}%`) });
    }

    const response = await this.tareaRepository.findAndCount({
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
