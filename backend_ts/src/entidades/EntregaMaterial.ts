// src/entities/EntregaMaterial.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('entregas_materiales')
export class EntregaMaterial {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_entrega' })
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  nombreMaterial!: string;

  @Column({ type: 'int' })
  cantidad!: number;

  @Column({ type: 'varchar', length: 255 })
  entregadoPor!: string;

  @Column({ type: 'varchar', length: 255 })
  recibidoPor!: string;

  @CreateDateColumn({ name: 'fecha_entrega' })
  fechaEntrega!: Date;
}