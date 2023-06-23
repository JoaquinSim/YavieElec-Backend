import { DataSource } from 'typeorm';
import {
  CandidatosEntity,
  CareerEntity,
  CargoEntity,
  CarreraEntity,
  CatalogueEntity,
  CronogramaEntity,
  CurriculumEntity,
  InformationStudentEntity,
  InformationTeacherEntity,
  InstitutionEntity,
  ListasEntity,
  StudentEntity,
  SubjectEntity,
  TareaEntity,
  VotosEntity,
} from '@core/entities';
import { DataSourceEnum, RepositoryEnum } from '@shared/enums';
import { TipoListaEntity } from '../entities/dignidad/tipoLista.entity';

export const coreProviders = [
  {
    provide: RepositoryEnum.CAREER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CareerEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CATALOGUE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CatalogueEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CURRICULUM_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CurriculumEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.INFORMATION_STUDENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InformationStudentEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.INFORMATION_TEACHER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InformationTeacherEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.INSTITUTION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InstitutionEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.STUDENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(StudentEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.SUBJECT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SubjectEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  //

  //CARRERA
  {
    provide: RepositoryEnum.CARRERA_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CarreraEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },

  //DIGNIDAD
  {
    provide: RepositoryEnum.CANDIDATO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CandidatosEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.LISTAS_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ListasEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CARGO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CargoEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.TIPO_LISTA_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TipoListaEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },



  //SUFRAGIO
  {
    provide: RepositoryEnum.VOTO_REPOSRITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(VotosEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },

  //Cronograma
  {
    provide: RepositoryEnum.TAREA_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TareaEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CRONOGRAMA_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CronogramaEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
];
