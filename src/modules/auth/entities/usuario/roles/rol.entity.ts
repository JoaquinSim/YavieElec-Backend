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
import { CatalogueEntity, CurriculumEntity } from '@core/entities';

@Entity('subjects', { schema: 'core' })
export class RolEntity {
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

  @Column('varchar', {
    name: 'nombre_rol',
    comment: 'Nombre del rol ejm: Admin, Votante',
  })
  nombreRol: string;

  @Column('varchar', {
    name: 'descripcionRol',
    comment: 'Descripcion del rol',
  })
  descripcionRol: string;
}
