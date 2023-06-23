import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TareaEntity } from './tarea.entity';


@Entity('cronogramas', { schema: 'core' })
export class CronogramaEntity {
  @PrimaryGeneratedColumn('uuid')
  id_cronograma: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del cronograma',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion del cronograma',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion del cronograma',
  })
  deletedAt: Date;

  @Column({
    type: 'varchar',
    name: 'nombre_cronograma',
    comment: 'Nombre del cronograma',
    nullable: true,
  })
  nombreCronograma: string;

  @Column({
    type: 'varchar',
    name: 'descripcion_cronograma',
    comment: 'Descripcion del cronograma',
    nullable: true,
  })
  descripcionCronograma: string;

  @Column({
    type: 'varchar',
    name: 'fecha_inicio',
    comment: 'Fecha de inicio del cronograma',
    nullable: true,
  })
  fechaInicio: string;

  @Column({
    type: 'varchar',
    name: 'fecha_fin',
    comment: 'Fecha de finalizacion del cronograma',
    nullable: true,
  })
  fechaFin: string;

  @Column({
    type: 'boolean',
    name: 'estado',
    comment: 'Estado del cronograma, Ejm: Activo o Inactivo',
    nullable: true,
  })
  estado: boolean;

  @OneToMany(() => TareaEntity, tarea => tarea.nombreCronograma)
  tareas: TareaEntity[];
}
