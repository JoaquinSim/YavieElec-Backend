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
} from 'typeorm';
import { CatalogueEntity, CurriculumEntity, VotosEntity } from '@core/entities';

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

  //@OneToMany(() => ListasEntity, (category) => category.parent)
  //@JoinColumn({ name: 'academic_period_id' })
  //academicPeriod: CatalogueEntity;

  @OneToMany(() => VotosEntity, (votos) => votos.lista)
  @JoinColumn({ name: 'id_lista' })
  address: VotosEntity;
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
    name: 'id_lista',
    comment: 'Id de la tabla lista',
  })
  id_lista: string;

  @Column('varchar', {
    name: 'periodo_lectivo',
    comment: 'Tabla de periodo lectivo',
  })
  periodo_lectivo: string;

  @Column('varchar', {
    name: 'nombre',
    comment: 'Nombre de la lista',
  })
  nombre: string;

  @Column('varchar', {
    name: 'slogan',
    comment: 'Slogan de la lista',
  })
  slogan: string;

  @Column('varchar', {
    name: 'propuesta',
    comment: 'propuesta de la lista',
  })
  propuesta: string;

  @Column('varchar', {
    name: 'color',
    comment: 'color de la lista',
  })
  color: string;

  @Column('numeric', {
    name: 'nro_lista',
    comment: 'Numero de la lista',
  })
  nro_lista: number;

  @Column('character', {
    name: 'logo',
    comment: 'Numero de la lista',
  })
  logo: string;

  @Column('boolean', {
    name: 'estado',
    comment: 'Estado de la lista',
  })
  estado: boolean;
}
