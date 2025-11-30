import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm';

export enum UserRole {
  USUARIO = 'usuario',
  ADMINISTRADOR = 'administrador',
  OPERADOR = 'operador',
}
/**
 * Define la entidad Usuario, mapeando a la tabla 'usuarios' con campos descriptivos.
 * - La contraseña se marca con 'select: false' para no ser cargada por defecto.
 * - Se utiliza @Unique(['email']) para asegurar que el correo electrónico sea único.
 */
@Entity('usuarios')
@Unique(['email'])
export class Usuario {
 @PrimaryGeneratedColumn({ type: 'int', name: 'id_usuario' })
  idUsuario!: number; 

  @Column({ type: 'varchar', length: 50 })
  nombre!: string;

  @Column({ type: 'varchar', length: 50 }) 
  email!: string;

  // Usamos 'select: false' por seguridad: evita que se devuelva en consultas automáticas
  @Column({ name: 'contraseña', type: 'varchar',length: 100, select: false })
  password!: string;

  @Column({ name: 'puntos_acumulados', type: 'integer', default: 0 })
  puntosAcumulados!: number;

  @Column({ 
    type: 'enum', 
    enum: UserRole, // <-- Usamos el ENUM de TS
    default: UserRole.USUARIO, // usuario por defecto
  }) 
  rol!: UserRole;

  @CreateDateColumn({ name: 'fecha_registro' })
  fechaRegistro!: Date;
}
