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
import { ListasEntity } from './listas.entity';
  
  @Entity('candidatos_lista', { schema: 'core' })
  export class CandidatosEntity {
    @PrimaryGeneratedColumn('uuid')
    idCandidatoLista: string;
  
    @CreateDateColumn({
      name: 'created_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
      comment: 'Fecha de creacion de candidatos',
    })
    createdAt: Date;
  
    @UpdateDateColumn({
      name: 'updated_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
      comment: 'Fecha de actualizacion de candidatos',
    })
    updatedAt: Date;
  
    @DeleteDateColumn({
      name: 'deleted_at',
      type: 'timestamptz',
      nullable: true,
      comment: 'Fecha de eliminacion de candidatos',
    })
    deletedAt: Date;

    @ManyToOne(() => ListasEntity, {
      nullable: true,
    })
    @JoinColumn({ name: 'lista_id' })
    lista: ListasEntity;

  
    @Column({
      name: 'id_usuario',
      type: 'numeric',
      comment: 'Id que tiene el usuario',
    })
    id_usuario: number;
    
  }
  