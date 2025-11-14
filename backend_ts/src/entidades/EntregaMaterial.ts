import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from './Usuarios'; 
import { Contenedor } from './Contenedor'; 

@Entity('entregas_materiales')
export class EntregaMaterial {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id_entrega' })
    idEntrega!: number;

    // Relación N:1 con Usuario: Se especifica el tipo 'int' de la columna
    @Column({ name: 'id_usuario', type: 'int' }) 
    idUsuario!: number; // Columna que guarda la FK

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario' })
    usuario!: Usuario; // Propiedad que carga la Entidad

    // Relación N:1 con Contenedor: Se especifica el tipo 'int' y nullable: true
    @Column({ name: 'id_contenedor', type: 'int', nullable: true }) 
    idContenedor!: number | null; // Columna que guarda la FK

    @ManyToOne(() => Contenedor, { nullable: true })
    @JoinColumn({ name: 'id_contenedor' })
    contenedor!: Contenedor;

    // Especificamos el tipo SQL 'varchar'
    @Column({ type: 'varchar', length: 100 })
    material!: string;

    // Especificamos el tipo SQL 'numeric' (para decimales)
    @Column({ type: 'numeric', precision: 5, scale: 2, name: 'peso_kg' })
    pesoKg!: number;

    // Especificamos el tipo SQL 'int'
    @Column({ type: 'int', name: 'puntos_ganados' })
    puntosGanados!: number;

    // CreateDateColumn infiere el tipo TIMESTAMP, pero se deja así por ser decorador específico
    @CreateDateColumn({ name: 'fecha_entrega' })
    fechaEntrega!: Date;
}