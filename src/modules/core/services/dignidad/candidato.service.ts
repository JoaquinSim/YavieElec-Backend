import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CandidatoDto,
  // CreateCandidatosListaDto,
  UpdateCandidatoDto,
  // FilterCandidatoListaDto,
  PaginationDto,
} from '@core/dto';
import { CandidatosEntity } from '@core/entities';
import { CronogramaService, CataloguesService } from '@core/services';
import { ListasService } from './lista.service';
import { CargosService } from './cargo.service'
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class CandidatosService {
  constructor(
    @Inject(RepositoryEnum.CANDIDATO_REPOSITORY)
    private candidatoRepository: Repository<CandidatosEntity>,
    private cataloguesService: CataloguesService,
    private listaService: ListasService,
    private cargoService: CargosService
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
    const newcandidato = this.candidatoRepository.create(payload);

    // newCandidato.modality = await this.cataloguesService.findOne(
    //   payload.modality.id,
    // );

    newcandidato.lista = (await this.listaService.findOne(
      payload.lista.id
    )).data;

    newcandidato.cargo = (await this.cargoService.findOne(
      payload.cargo.idCargo
    )).data;

    console.log("Creando candidato unida al cronograma: " + newcandidato);


    //newCandidato.state = await this.cataloguesService.findOne(payload.state.id);

    //newCandidato.type = await this.cataloguesService.findOne(payload.type.id);

    const candidatoCreated = await this.candidatoRepository.save(newcandidato);

    return { data: candidatoCreated };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.candidatoRepository.findAndCount({
      relations: ['lista', 'cargo'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(idCandidatoLista: string): Promise<any> {
    const candidato = await this.candidatoRepository.findOne({
      relations: ['lista'],
      where: {
        idCandidatoLista,
      },
    });

    console.log("Cronograma unida a la candidato: " + candidato.lista);

    if (!candidato) {
      throw new NotFoundException(`El candidato con ID:  ${idCandidatoLista} no se encontro`);
    }
    return { data: candidato };
  }

  async update(
    idCandidatoLista: string,
    payload: UpdateCandidatoDto,
  ): Promise<ServiceResponseHttpModel> {
    const candidato = await this.candidatoRepository.findOneBy({ idCandidatoLista });
    if (!candidato) {
      throw new NotFoundException(`El candidato con id:  ${idCandidatoLista} no se encontro`);
    }
    this.candidatoRepository.merge(candidato, payload);
    const candidatoUpdated = await this.candidatoRepository.save(candidato);
    return { data: candidatoUpdated };
  }

  async remove(idCandidatoLista: string): Promise<ServiceResponseHttpModel> {
    const candidato = await this.candidatoRepository.findOneBy({ idCandidatoLista });

    if (!candidato) {
      throw new NotFoundException(`El candidato con ID:  ${idCandidatoLista} no se encontro`);
    }

    const candidatoDeleted = await this.candidatoRepository.softRemove(candidato);

    return { data: candidatoDeleted };
  }

  async removeAll(payload: CandidatosEntity[]): Promise<ServiceResponseHttpModel> {
    const candidatoDeleted = await this.candidatoRepository.softRemove(payload);
    return { data: candidatoDeleted };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CandidatosEntity>
      | FindOptionsWhere<CandidatosEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ idCandidatoLista: ILike(`%${search}%`) });
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
