import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('cargo', { schema: 'core' })
  export class CargoEntity {
    @PrimaryGeneratedColumn('uuid')
    idCargo: string;
  
    @CreateDateColumn({
      name: 'created_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
      comment: 'Fecha de creacion del cargo',
    })
    createdAt: Date;
  
    @UpdateDateColumn({
      name: 'updated_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
      comment: 'Fecha de actualizacion de la ultima actualizacion del cargo',
    })
    updatedAt: Date;
  
    @DeleteDateColumn({
      name: 'deleted_at',
      type: 'timestamptz',
      nullable: true,
      comment: 'Fecha de eliminacion del cargo',
    })
    deletedAt: Date;
  
    // @ManyToOne(() => CargoEntity, (category) => category.children)
    // parent: CargoEntity;
  
    // @OneToMany(() => CargoEntity, (category) => category.parent)
    // children: CargoEntity[];
  
    /*
    // COLUMS
    */
    @Column({
      name: 'nombre_cargo',
      type: 'varchar',
      comment: 'Nombre del cargo. Ej: ',
    })
    nombreCargo: string;
  
    @Column({
      name: 'descripcion_cargo',
      type: 'varchar',
      comment: 'Descripcion del cargo en el que se encuentra. Ej. Presidente, Secretario'
    })
    descripcionCargo: string;
  }
  