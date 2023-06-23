import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  // CreateCronogramaDto,
  // UpdateCronogramaDto,
  // FilterCareerDto,
  PaginationDto,
} from '@core/dto';
import { CarreraEntity } from '@core/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class CarrerasService {
  constructor(
    @Inject(RepositoryEnum.CARRERA_REPOSITORY)
    private carreraRepository: Repository<CarreraEntity>,
  ) { }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.carreraRepository.findAndCount({
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

  async create(
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const newCarrera = this.carreraRepository.create(payload);

    return { data: newCarrera };
  }

  async findAll(): Promise<ServiceResponseHttpModel> {
    //All
    const data = await this.carreraRepository.findAndCount({
      // relations: ['institution', 'modality', 'state', 'type'],
    });

    return { data };
  }

  async findOne(idCarrera: string): Promise<any> {
    const carrera = await this.carreraRepository.findOne({
      //relations: ['institution', 'modality', 'state', 'type'],
      where: {
        idCarrera,
      },
    });

    if (!carrera) {
      throw new NotFoundException(
        `El carrera con id:  ${carrera} no se encontro`,
      );
    }
    return { data: carrera };
  }

  async update(
    idCarrera: string,
    payload: any,
  ): Promise<ServiceResponseHttpModel> {
    const carrera = await this.carreraRepository.findOneBy({
      idCarrera,
    });
    if (!carrera) {
      throw new NotFoundException(
        `la carrera con id:  ${idCarrera} no se encontro`,
      );
    }
    this.carreraRepository.merge(carrera, payload);
    const carreraUpdated = await this.carreraRepository.save(carrera);
    return { data: carreraUpdated };
  }

  async remove(idCarrera: string): Promise<ServiceResponseHttpModel> {
    const carrera = await this.carreraRepository.findOneBy({
        idCarrera,
    });

    if (!carrera) {
      throw new NotFoundException(
        `la carrera con id:  ${idCarrera} no se encontro`,
      );
    }

    const carreraDeleted = await this.carreraRepository.softRemove(
      carrera,
    );

    return { data: carreraDeleted };
  }

  async removeAll(
    payload: CarreraEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const carreraDeleted = await this.carreraRepository.softRemove(
      payload,
    );
    return { data: carreraDeleted };
  }
}
