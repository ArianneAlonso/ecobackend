// src/data-source.ts
import { DataSource } from 'typeorm';
import { Usuario } from './modelos/usuarios.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ecoresiduos',
  database: 'prueba_db',
  synchronize: false,
  logging: false,
  entities: [Usuario],
});