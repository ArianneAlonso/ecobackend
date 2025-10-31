// src/data-source.ts
import { DataSource } from 'typeorm';
import { Usuario } from './entidades/Usuarios';
import * as dotenv from "dotenv";
dotenv.config();

// AGREGADO TEMPORAL PARA DEBUG
console.log('=== CONFIG DE BASE DE DATOS ===');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('================================');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  synchronize: false,
  logging: true, // CAMBIADO A TRUE PARA VER QUERIES
  entities: [Usuario],
});
