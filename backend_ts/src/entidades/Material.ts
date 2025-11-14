// src/entidades/Material.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EntregaMaterial } from './EntregaMaterial';

@Entity('materiales')
export class Material {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id_material' })
    idMaterial!: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    nombre!: string;

    // Relación 1:N con EntregaMaterial: Un material puede estar en muchas entregas.
    // Aunque no es estrictamente necesario para la consulta del dashboard, es bueno para la navegación.
    @OneToMany(() => EntregaMaterial, (entrega) => entrega.material)
    entregas!: EntregaMaterial[];
}