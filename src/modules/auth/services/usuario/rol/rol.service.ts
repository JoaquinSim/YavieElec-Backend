import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, In } from 'typeorm';
import {
  // CreateCatalogueDto,
  // CreateStudentDto,
  // FilterStudentDto,
  PaginationDto,
  // UpdateStudentDto,
} from '@core/dto';
import { RepositoryEnum } from '@shared/enums';
import { RolEntity } from '@auth/entities';

@Injectable()
export class RolService {
  constructor(
    @Inject(RepositoryEnum.ROL_REPOSITORY)
    private rolRepository: Repository<RolEntity>,
  ) {}

  async create(payload: any) {
    const newrol = this.rolRepository.create(payload);

    const rolCreated = await this.rolRepository.save(newrol);

    return await this.rolRepository.save(rolCreated);
  }

  async catalogue() {
    const data = await this.rolRepository.findAndCount({
      take: 1000,
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findAll(params?: any) {
    //Pagination & Filter by search
    if (params) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.rolRepository.findAndCount();

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string) {
    const rol = await this.rolRepository.findOne({
      where: { id },
    });

    if (!rol) {
      throw new NotFoundException('rol no se encuentra');
    }

    return rol;
  }

  async update(id: string, payload: any) {
    const rol = await this.rolRepository.findOneBy({ id });

    if (!rol) {
      throw new NotFoundException('rol not found');
    }

    this.rolRepository.merge(rol, payload);

    return this.rolRepository.save(rol);
  }

  async remove(id: string) {
    const rol = await this.rolRepository.findOneBy({ id });

    if (!rol) {
      throw new NotFoundException('rol not found');
    }

    return await this.rolRepository.softRemove(rol);
  }

  async removeAll(payload: RolEntity[]) {
    return this.rolRepository.softRemove(payload);
  }

  private async paginateAndFilter(params: any) {
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

    const data = await this.rolRepository.findAndCount({
      //relations: ['bloodType', 'gender'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { pagination: { limit, totalItems: data[1] }, data: data[0] };
  }
}
