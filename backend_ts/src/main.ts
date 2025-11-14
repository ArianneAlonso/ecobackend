// src/index.ts
import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source.js';
import usuarioRoutes from './routes/usuarios.routes.js';
import entregasRoutes from './routes/entrega.routes.js';
import  DashboardRoutes from './routes/dashboard.routes.js';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';


AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());
  app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}));

 app.use(session({
    secret: process.env.SESSION_SECRET || 'mi-clave-secreta-fuerte',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    }
}));

  app.use(morgan('dev'));
  app.use('/usuarios', usuarioRoutes);
  app.use('/entregas', entregasRoutes);
  app.use('/dashboard', DashboardRoutes);
  app.listen(3000, () => console.log('Servidor iniciado en puerto 3000'));
});