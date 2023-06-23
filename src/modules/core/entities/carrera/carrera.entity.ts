import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('carrera', { schema: 'core' })
export class CarreraEntity {
    @PrimaryGeneratedColumn('uuid')
    idCarrera: string;

    @CreateDateColumn({
        name: 'ended_At',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de creacion de la carrera',
    })
    endedAt: Date;

    @CreateDateColumn({
        name: 'started_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de creacion de la carrera',
    })
    startedAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAT: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        nullable: true,
    })
    deletedAT: Date;

    @Column({
        name: 'codigo',
        type: 'varchar',
        comment: 'Codigo que tiene la carrera'
    })
    codigo: string

    @Column({
        name: 'nombre',
        type: 'varchar',
        comment: 'Nombre que tiene la carrera'
    })
    nombre: string
}
