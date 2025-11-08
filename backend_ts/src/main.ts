// src/index.ts
import express from 'express';
import { AppDataSource } from './data-source.js';
import usuarioRoutes from './routes/usuarios.routes.js';
import entregasRouter from './routes/entrega.routes.js';
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
        secret: process.env.SESSION_SECRET || 'mi_secreto_muy_seguro', // Usa una clave fuerte de env
        resave: false, // Evita reescribir la sesión si no se modifica
        saveUninitialized: false, // Evita guardar sesiones que no han sido modificadas (útil para login)
        cookie: {
            secure: false, // Cambiar a true en producción (requiere HTTPS)
            httpOnly: true, // Protege contra XSS
            maxAge: 3600000 // 1 hora
        }
        // store: /* Configuración para producción (ej. nuevo PgSessionStore) */
    }));
  app.use(morgan('dev'));
  app.use('/usuarios', usuarioRoutes);
  app.use('/entregas', entregasRouter);
  app.listen(3000, () => console.log('Servidor iniciado en puerto 3000'));
});