import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as Bcrypt from 'bcrypt';
import { RolEntity } from '../roles/rol.entity';

@Entity('usuario', { schema: 'auth' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'fecha de creación de usuario',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'fecha de actualización de usuario',
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'fecha de eliminación de usuario',
  })
  deletedAt: Date;
 
  @Column({
    name: 'roles',
    type: 'varchar',
    comment: 'roles del usuario',
  })
  roles: string;

  @Column({
    name: 'cedula',
    type: 'numeric',
    comment: 'Escribir su numero de cedula',
  })
  cedula: number;

  @Column({
    name: 'nombre',
    type: 'varchar',
    comment: 'Escribir su nombre. Ej: Joselito',
  })
  nombre: string;

  @Column({
    name: 'apellido',
    type: 'varchar',
    comment: 'Escriba su Apellido. Ej: Perez',
  })
  apellido: string;

  @Column({
    name: 'semestre',
    type: 'varchar',
    comment: 'Especifique la carrea en la que esta',
  })
  semestre: string;

  @Column({
    name: 'carrera',
    type: 'varchar',
    comment: 'Especifique la carrera en la que esta',
  })
  carrera: string;

  @Column({
    name: 'correo',
    type: 'varchar',
    comment: 'Escriba su coreo',
  })
  correo: string;

  @Column({
    name: 'estado',
    type: 'boolean',
    comment: 'Especifique su estado. Ej: Activo',
  })
  estado: boolean;

  @Column({
    name: 'clave',
    type: 'varchar',
    comment: 'Especifique su password de seguridad',
  })
  clave: string;

  @Column({
    name: 'estadoVoto',
    type: 'boolean',
    comment: 'Especificar el voto. Ej: Valido, Nulo, Blanco',
  })
  estadoVoto: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.clave) {
      return;
    }
    this.clave = await Bcrypt.hash(this.clave, 10);
  }
}
