import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CatalogueEntity, CurriculumEntity } from '@core/entities';
import { UsuarioEntity } from '@auth/entities';

@Entity('rol', { schema: 'auth' })
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

  @ManyToOne(()=> UsuarioEntity, (usuarios) =>usuarios.roles)
  usuarios: UsuarioEntity;

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
