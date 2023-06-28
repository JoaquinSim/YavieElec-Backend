import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CandidatosEntity, CatalogueEntity, CurriculumEntity, TipoListaEntity, VotosEntity } from '@core/entities';

@Entity('listas', { schema: 'core' })
export class ListasEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  @OneToMany(() => CandidatosEntity, (candidato) => candidato.lista)
  candidato: CandidatosEntity[];

  @OneToOne(() => TipoListaEntity)
  @JoinColumn()
  tipoLista: TipoListaEntity;

  // @OneToMany(() => VotosEntity, (votos) => votos.lista)
  // @JoinColumn({ name: 'id_lista' })
  // address: VotosEntity;
  /*
    @ManyToOne(() => CurriculumEntity, { nullable: false })
    @JoinColumn({ name: 'curriculum_id' })
    curriculum: CurriculumEntity;
  
    @ManyToOne(() => CatalogueEntity, { nullable: false })
    @JoinColumn({ name: 'state_id' })
    state: CatalogueEntity;
  
    @ManyToOne(() => CatalogueEntity, { nullable: true })
    @JoinColumn({ name: 'type_id' })
    type: CatalogueEntity;
  */
  @Column('varchar', {
    name: 'periodo_lectivo',
    nullable: true,
    comment: 'Tabla de periodo lectivo',
  })
  periodo_lectivo: string;

  @Column('varchar', {
    name: 'nombre',
    nullable: true,
    comment: 'Nombre de la lista',
  })
  nombre: string;

  @Column('varchar', {
    name: 'slogan',
    nullable: true,
    comment: 'Slogan de la lista',
  })
  slogan: string;

  @Column('varchar', {
    name: 'propuesta',
    nullable: true,
    comment: 'propuesta de la lista',
  })
  propuesta: string;

  @Column('varchar', {
    name: 'color',
    nullable: true,
    comment: 'color de la lista',
  })
  color: string;

  @Column('numeric', {
    name: 'nro_lista',
    nullable: true,
    comment: 'Numero de la lista',
  })
  nro_lista: number;

  @Column('varchar', {
    name: 'logo',
    nullable: true,
    comment: 'Numero de la lista',
  })
  logo: string;

  @Column('boolean', {
    name: 'estado',
    nullable: true,
    comment: 'Estado de la lista',
  })
  estado: boolean;
}
