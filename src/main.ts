// src/index.ts
import express from 'express';
import { AppDataSource } from './data-source.js';
import usuarioRoutes from './routes/usuarios.routes.js';

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());
  app.use('/usuarios', usuarioRoutes);
  app.listen(3000, () => console.log('Servidor iniciado en puerto 3000'));
});