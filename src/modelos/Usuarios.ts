// src/entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm';

@Entity('usuarios')
@Unique(['email'])
export class Usuario {
  @PrimaryGeneratedColumn('increment' as any, { name: 'id_usuario' } as any)
  id!: number;

  @Column({ type: 'varchar' })
  nombre!: string;

  @Column()
  email!: string;

  @Column({ name: 'contraseña' })
  password!: string;

  @CreateDateColumn({ name: 'fecha_registro' })
  fechaRegistro!: Date;
}