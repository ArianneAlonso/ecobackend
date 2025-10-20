// src/entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm';

@Entity('usuarios')
@Unique(['email'])
export class Usuario {
    
  // THIS IS THE MISSING PART: The decorator must be applied to a property.
  @PrimaryGeneratedColumn('increment', { name: 'id_usuario' })
  id!: number; // <- You need to declare the property here!

  @Column({ type: 'varchar', length: 255 })
  nombre!: string;

  @Column({ type: 'varchar', length: 255 }) 
  email!: string;

  @Column({ name: 'contraseña', type: 'text' })
  password!: string;

  @CreateDateColumn({ name: 'fecha_registro' })
  fechaRegistro!: Date;
}