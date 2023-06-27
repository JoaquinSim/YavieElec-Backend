import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CronogramaEntity } from './cronograma.entity';
import { CatalogueEntity } from '../catalogue.entity';

@Entity('tarea', { schema: 'core' })
export class TareaEntity {
  @PrimaryGeneratedColumn('uuid')
  id_tarea: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la tarea',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la tarea',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion de la tarea',
  })
  deletedAt: Date;

  // @ManyToOne(() => CronogramaEntity, cronograma => cronograma.tareas)
  // cronograma: CronogramaEntity

  @ManyToOne(() => CronogramaEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'cronograma_id' })
  cronograma: CronogramaEntity;

  // @ManyToOne(() => CatalogueEntity, {
  //   nullable: true,
  // })
  // @JoinColumn({ name: 'modality_id' })
  // modality: CatalogueEntity;

  @Column({
    type: 'varchar',
    name: 'nombre_tarea',
    comment: 'Nombre de la tarea',
  })
  nombreTarea: string;

  @Column({
    type: 'varchar',
    name: 'descripcion_tarea',
    comment: 'Descripcion de la tarea',
  })
  descripcionTarea: string;
}
