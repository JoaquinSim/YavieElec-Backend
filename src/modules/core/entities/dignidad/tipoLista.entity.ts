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
  
  @Entity('tipo_lista', { schema: 'core' })
  export class TipoListaEntity {
    @PrimaryGeneratedColumn('uuid')
    id_tipoLista: string;
  
    @CreateDateColumn({
      name: 'created_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
      comment: 'Fecha de creacion del tipo de lista',
    })
    createdAt: Date;
  
    @UpdateDateColumn({
      name: 'updated_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
      comment: 'Fecha de actualizacion del tipo de lista',
    })
    updatedAt: Date;
  
    @DeleteDateColumn({
      name: 'deleted_at',
      type: 'timestamptz',
      nullable: true,
      comment: 'Fecha de eliminacion del tipo de lista',
    })
    deletedAt: Date;
    /*
        @ManyToOne(() => InstitutionEntity, {
          nullable: true,
        })
        @JoinColumn({ name: 'institution_id' })
        institution: InstitutionEntity;
      
        @ManyToOne(() => CatalogueEntity, {
          nullable: true,
        })
        @JoinColumn({ name: 'modality_id' })
        modality: CatalogueEntity;
      
        @ManyToOne(() => CatalogueEntity, {
          nullable: true,
        })
        @JoinColumn({ name: 'state_id' })
        state: CatalogueEntity;
      
        @ManyToOne(() => CatalogueEntity, {
          nullable: true,
        })
        @JoinColumn({ name: 'type_id' })
        type: CatalogueEntity;
      */
    @Column({
      type: 'varchar',
      name: 'nombre_tipo_lista',
      comment: 'Nombre del tipo de lista',
    })
    nombreTipoLista: string;
  
    @Column({
      type: 'varchar',
      name: 'descripcion_tipo_lista',
      comment: 'Descripcion del tipo de lista',
    })
    descripcionTipoLista: string;
  }
  