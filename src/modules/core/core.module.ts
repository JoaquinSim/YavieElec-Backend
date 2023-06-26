import { Global, Module } from '@nestjs/common';
import {
  CareersController,
  CataloguesController,
  CurriculaController,
  InformationStudentsController,
  InstitutionsController,
  StudentsController,
  SubjectsController,
  InformationTeachersController,
  CandidatoController,
  CargoController,
  CarreraController,
  VotosController,
  ListasController,
  CronogramaController,
  TareaController,
  TipoListaController
} from '@core/controllers';
import {
  CareersService,
  CataloguesService,
  CurriculaService,
  InformationStudentsService,
  InstitutionsService,
  StudentsService,
  SubjectsService,
  InformationTeachersService,
  CandidatosService,
  CargosService,
  CarrerasService,
  VotosService,
  ListasService,
  CronogramaService,
  TareaService,
  TipoListaService
} from '@core/services';
import { DatabaseModule } from '@database';
import { coreProviders } from '@core/providers';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [
    CareersController,
    CataloguesController,
    CurriculaController,
    InformationStudentsController,
    InformationTeachersController,
    InstitutionsController,
    StudentsController,
    SubjectsController,

    //
    CandidatoController,
    CargoController,
    TipoListaController,
    ListasController,
    //
    
    //
    CarreraController,
    //
    //
    VotosController,
    //

    //
    CronogramaController,
    TareaController,
    //

  ],
  providers: [
    ...coreProviders,
    CareersService,
    CataloguesService,
    CurriculaService,
    InformationStudentsService,
    InformationTeachersService,
    InstitutionsService,
    StudentsService,
    SubjectsService,

    //
    CandidatosService,
    CargosService,
    ListasService,
    TipoListaService,
    //

    //
    CarrerasService,
    //

    //
    VotosService,
    //

    //
    CronogramaService,
    TareaService
    //
  ],
  exports: [
    ...coreProviders,
    CareersService,
    CataloguesService,
    CurriculaService,
    InformationStudentsService,
    InformationTeachersService,
    InstitutionsService,
    StudentsService,
    SubjectsService,

    //
    CandidatosService,
    CargosService,
    ListasService,
    TipoListaService,
    //

    //
    CarrerasService,
    //

    //
    VotosService,
    //

    //
    CronogramaService,
    TareaService,
    //
  ],
})
export class CoreModule {}
