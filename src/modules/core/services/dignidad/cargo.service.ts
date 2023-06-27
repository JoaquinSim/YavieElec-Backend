import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
   CreateCargoDto,
  // UpdateCargoDto,
  // FilterCargoDto,
  PaginationDto,
  UpdateCargoDto,
} from '@core/dto';
import { CargoEntity } from '@core/entities';
import { InstitutionsService, CataloguesService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { any } from 'joi';

@Injectable()
export class CargosService {
  constructor(
    @Inject(RepositoryEnum.CARGO_REPOSITORY)
    private cargoRepository: Repository<CargoEntity>,
    private institutionService: InstitutionsService,
    private cataloguesService: CataloguesService,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.cargoRepository.findAndCount({
      //relations: ['idCargo', 'nombre', 'cargo'],
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

  async create(payload: CreateCargoDto): Promise<ServiceResponseHttpModel> {
    const newCargo = this.cargoRepository.create(payload);

    // newCareer.institution = await this.institutionService.findOne(
    //   payload.institution.idCargoCargoCargoCargoCargoCargoCargo,
    // );

    // newCargo.modality = await this.cataloguesService.findOne(
    //   payload.modality.idCargo,
    // );

    // newCargo.state = await this.cataloguesService.findOne(payload.state.idCargo);

    //newCandidCargoCargoCargoCargoCargoCargoCargoato.type = await this.cataloguesService.findOne(payload.type.idCargoCargoCargoCargoCargoCargoCargo);

    const cargoCreated = await this.cargoRepository.save(newCargo);

    return { data: cargoCreated };
  }

  async findAll(params?: any): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.cargoRepository.findAndCount({
      //relations: ['idCargoCargoCargoCargoCargoCargoCargoCargo', 'nombre', 'cargo'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(idCargo: string): Promise<any> {
    const cargo = await this.cargoRepository.findOne({
     // relations: ['idCargo', 'nombre', 'cargo'],
      where: {
        idCargo,
      },
    });

    if (!cargo) {
      throw new NotFoundException(`El cargo con idCargo:  ${idCargo} no se encontro`);
    }
    return { data: cargo };
  }

  async update(
    idCargo: string,
    payload: UpdateCargoDto,
  ): Promise<ServiceResponseHttpModel> {
    const cargo = await this.cargoRepository.findOneBy({ idCargo });
    if (!cargo) {
      throw new NotFoundException(`el cargo con idCargo:  ${idCargo} no se encontro`);
    }
    this.cargoRepository.merge(cargo, payload);
    const cargoUpdated = await this.cargoRepository.save(cargo);
    return { data: cargoUpdated };
  }

  async remove(idCargo: string): Promise<ServiceResponseHttpModel> {
    const cargo = await this.cargoRepository.findOneBy({ idCargo });

    if (!cargo) {
      throw new NotFoundException(`El cargo con idCargo:  ${idCargo} no se encontro`);
    }

    const cargoDeleted = await this.cargoRepository.softRemove(cargo);

    return { data: cargoDeleted };
  }

  async removeAll(payload: CargoEntity[]): Promise<ServiceResponseHttpModel> {
    const cargoDeleted = await this.cargoRepository.softRemove(payload);
    return { data: cargoDeleted };
  }

  private async paginateAndFilter(
    params: any,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CargoEntity>
      | FindOptionsWhere<CargoEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ idCargo: ILike(`%${search}%`) });
      where.push({ nombreCargo: ILike(`%${search}%`) });
      where.push({ descripcionCargo: ILike(`%${search}%`) });
    }

    const response = await this.cargoRepository.findAndCount({
      relations: ['idCargoCargoCargoCargoCargoCargoCargo', 'nombre', 'cargo'],
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
