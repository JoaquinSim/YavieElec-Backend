import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CandidatoDto,
  // CreateCandidatosListaDto,
  // UpdateCandidatoDto,
  // FilterCandidatoListaDto,
  PaginationDto, TareaDto,
} from '@core/dto';
import { CandidatosEntity, TareaEntity } from '@core/entities';
import { CronogramaService, CataloguesService, } from '@core/services';
import { ListasService } from './lista.service';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class CandidatosService {
  constructor(
    @Inject(RepositoryEnum.CANDIDATO_REPOSITORY)
    private candidatoRepository: Repository<CandidatosEntity>,
    private cataloguesService: CataloguesService,
    private listaService: ListasService,
  ) { }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.candidatoRepository.findAndCount({
      relations: ['lista'],
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

  async create(payload: CandidatoDto): Promise<ServiceResponseHttpModel> {
    const newtarea = this.candidatoRepository.create(payload);

    // newCandidato.modality = await this.cataloguesService.findOne(
    //   payload.modality.id,
    // );

    newtarea.lista = (await this.listaService.findOne(
      payload.lista.id
    )).data;

    console.log("Creando tarea unida al cronograma: " + newtarea);


    //newCandidato.state = await this.cataloguesService.findOne(payload.state.id);

    //newCandidato.type = await this.cataloguesService.findOne(payload.type.id);

    const tareaCreated = await this.candidatoRepository.save(newtarea);

    return { data: tareaCreated };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.candidatoRepository.findAndCount({
      relations: ['lista'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(idCandidatoLista: string): Promise<any> {
    const tarea = await this.candidatoRepository.findOne({
      relations: ['lista'],
      where: {
        idCandidatoLista,
      },
    });

    console.log("Cronograma unida a la tarea: " + tarea.lista);

    if (!tarea) {
      throw new NotFoundException(`El tarea con ID:  ${idCandidatoLista} no se encontro`);
    }
    return { data: tarea };
  }

  async update(
    idCandidatoLista: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const tarea = await this.candidatoRepository.findOneBy({ idCandidatoLista });
    if (!tarea) {
      throw new NotFoundException(`El tarea con id:  ${idCandidatoLista} no se encontro`);
    }
    this.candidatoRepository.merge(tarea, payload);
    const tareaUpdated = await this.candidatoRepository.save(tarea);
    return { data: tareaUpdated };
  }

  async remove(idCandidatoLista: string): Promise<ServiceResponseHttpModel> {
    const tarea = await this.candidatoRepository.findOneBy({ idCandidatoLista });

    if (!tarea) {
      throw new NotFoundException(`El tarea con ID:  ${idCandidatoLista} no se encontro`);
    }

    const tareaDeleted = await this.candidatoRepository.softRemove(tarea);

    return { data: tareaDeleted };
  }

  async removeAll(payload: TareaEntity[]): Promise<ServiceResponseHttpModel> {
    const tareaDeleted = await this.candidatoRepository.softRemove(payload);
    return { data: tareaDeleted };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<TareaEntity>
      | FindOptionsWhere<TareaEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ id_tarea: ILike(`%${search}%`) });
    }

    const response = await this.candidatoRepository.findAndCount({
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
