// src/data-source.ts
import { DataSource } from 'typeorm';
import { Usuario } from './entidades/Usuarios';
import * as dotenv from "dotenv";
dotenv.config();

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
