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
import { UsuarioEntity } from '@auth/entities';
import { ServiceResponseHttpModel } from '@shared/models';
import { CreateUsuarioDto, UpdateUsuarioDto } from '@auth/dto';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject(RepositoryEnum.USUARIO_REPOSITORY)
    private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async create(payload: CreateUsuarioDto): Promise<ServiceResponseHttpModel> {
    const newUsuario = this.usuarioRepository.create(payload);

    // newCandidato.modality = await this.cataloguesService.findOne(
    //   payload.modality.id,
    // );

    // newtarea.cronograma = (
    //   await this.cronogramaService.findOne(payload.cronograma.id_cronograma)
    // ).data;

    // console.log('Creando tarea unida al cronograma: ' + newtarea);

    //newCandidato.state = await this.cataloguesService.findOne(payload.state.id);

    //newCandidato.type = await this.cataloguesService.findOne(payload.type.id);

    const usuarioCreated = await this.usuarioRepository.save(newUsuario);

    return { data: usuarioCreated };
  }

  async catalogue() {
    const data = await this.usuarioRepository.findAndCount({
      take: 1000,
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findAll(): Promise<ServiceResponseHttpModel> {
    //All
    const data = await this.usuarioRepository.findAndCount({
      // relations: ['institution', 'modality', 'state', 'type'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no se encuentra');
    }

    return { data: usuario };
  }

  async update(
    id: string,
    payload: UpdateUsuarioDto,
  ): Promise<ServiceResponseHttpModel> {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException('Usuario not found');
    }

    this.usuarioRepository.merge(usuario, payload);
    const usuarioUpdated = await this.usuarioRepository.save(usuario);
    return { data: usuarioUpdated };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException('usuario not found');
    }

    const usuarioDeleted = await this.usuarioRepository.softRemove(usuario);

    return { data: usuarioDeleted };
  }

  async removeAll(payload: UsuarioEntity[]): Promise<ServiceResponseHttpModel> {
    const usuarioDeleted = await this.usuarioRepository.softRemove(payload);
    return { data: usuarioDeleted };
  }

  private async paginateAndFilter(params: any) {
    let where:
      | FindOptionsWhere<UsuarioEntity>
      | FindOptionsWhere<UsuarioEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ id: ILike(`%${search}%`) });
    }

    const data = await this.usuarioRepository.findAndCount({
      //relations: ['bloodType', 'gender'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { pagination: { limit, totalItems: data[1] }, data: data[0] };
  }
}
