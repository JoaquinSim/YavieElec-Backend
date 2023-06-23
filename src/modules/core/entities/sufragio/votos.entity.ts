import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CatalogueEntity, CurriculumEntity, ListasEntity } from '@core/entities';

@Entity('votos', { schema: 'core' })
export class VotosEntity {
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

  // @ManyToOne(() => ListasEntity, { nullable: false })
  // @JoinColumn({ name: 'id_votos' })
  // academicPeriod: ListasEntity;
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
    name: 'id_votos',
    comment: 'Id de la tabla votos',
  })
  id_votos: string;

  @Column('varchar', {
    name: 'periodo_lectivo',
    comment: 'Tabla de periodo lectivo',
  })
  periodo_lectivo: string;

  @Column('varchar', {
    name: 'lista',
    comment: 'Tabla de lista',
  })
  lista: string;

  @Column('varchar', {
    name: 'tipo_voto',
    comment: 'Valido, nulo o en blanco',
  })
  tipo_voto: string;
  
  @Column('date', {
      name: 'hora_voto',
      comment: 'Hora a la que se realizo el voto',
    })
    hora_voto: Date;
}
