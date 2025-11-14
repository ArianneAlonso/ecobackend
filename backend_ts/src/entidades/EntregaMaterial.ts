// src/entidades/EntregaMaterial.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from './Usuarios'; 
import { Contenedor } from './Contenedor'; 
import { Material } from './Material';

@Entity('entregas_materiales')
export class EntregaMaterial {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id_entrega' })
    idEntrega!: number;

    // Relación N:1 con Usuario
    @Column({ name: 'id_usuario', type: 'int' }) 
    idUsuario!: number; 

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario' })
    usuario!: Usuario; 

    // Relación N:1 con Contenedor
    @Column({ name: 'id_contenedor', type: 'int', nullable: true }) 
    idContenedor!: number | null; 

    @ManyToOne(() => Contenedor, { nullable: true })
    @JoinColumn({ name: 'id_contenedor' })
    contenedor!: Contenedor;

    
    @Column({ name: 'id_material', type: 'int' }) 
    idMaterial!: number; 

    @ManyToOne(() => Material)
    @JoinColumn({ name: 'id_material' })
    material!: Material;

    
    @Column({ type: 'numeric', precision: 5, scale: 2, name: 'peso_kg' })
    pesoKg!: number;

    
    @Column({ type: 'int', name: 'puntos_ganados' })
    puntosGanados!: number;

    @CreateDateColumn({ name: 'fecha_entrega' })
    fechaEntrega!: Date;
}