import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity } from 'typeorm';

// Define el tipo de material que almacena el contenedor
export enum TipoMaterialContenedor {
    PLASTICO = 'plastico',
    PAPEL = 'papel',
    VIDRIO = 'vidrio',
    ORGANICO = 'organico',
}

@Entity('contenedores')
export class Contenedor extends BaseEntity {

    @PrimaryGeneratedColumn({ type: 'int', name: 'id_contenedor' })
    idContenedor!: number;

    @Column({ type: 'varchar', length: 150, name: 'nombre_identificador' })
    nombreIdentificador!: string; // Ej: "Contenedor Azul ZN-001"

    @Column({ type: 'varchar', length: 255 })
    direccion!: string;

    @Column({ type: 'numeric', precision: 10, scale: 7, name: 'latitud' })
    latitud!: number;

    @Column({ type: 'numeric', precision: 10, scale: 7, name: 'longitud' })
    longitud!: number;

    @Column({ type: 'enum', enum: TipoMaterialContenedor, name: 'tipo_material' })
    tipoMaterial!: TipoMaterialContenedor; // Qué tipo de residuo acepta

    @Column({ type: 'int', name: 'capacidad_litros' })
    capacidadLitros!: number;
    
    @CreateDateColumn({ name: 'fecha_instalacion' })
    fechaInstalacion!: Date;
}