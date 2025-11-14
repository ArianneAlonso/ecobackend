// src/index.ts
import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source.js';
import usuarioRoutes from './routes/usuarios.routes.js';
import entregasRoutes from './routes/entrega.routes.js';
import DashboardRoutes from './routes/dashboard.routes.js';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import dotenv from 'dotenv'; // ⬅️ Importar dotenv para leer SESSION_SECRET

// Cargar variables de entorno
dotenv.config();

// Inicializar la base de datos
AppDataSource.initialize().then(() => {
    const app = express();

    // 1. Configuración de Middlewares Básicos
    app.use(express.json());

    // 2. Configuración de CORS
    const isProduction = process.env.NODE_ENV === 'production';
    app.use(cors({
        // Esto permite que el frontend de desarrollo (http://localhost:5173) acceda al backend.
        origin: 'http://localhost:5173',
        // Esto es ESENCIAL para que las cookies de sesión (connect.sid) sean aceptadas.
        credentials: true, 
    }));

    // 3. Configuración de EXPRESS-SESSION
    app.use(session({
        secret: process.env.SESSION_SECRET || 'mi-clave-secreta-fuerte',
        resave: false,
        saveUninitialized: false,
        cookie: { 
            maxAge: 1000 * 60 * 60 * 24, // 24 horas
            // IMPORTANTE: Cambiamos httpOnly a true por seguridad.
            httpOnly: true, 
            
            // CORRECCIÓN: Ajustamos 'secure' para que funcione en HTTP local.
            // La cookie solo se enviará sobre HTTPS en producción, pero funcionará en HTTP en desarrollo.
            secure: isProduction, 

            // Para que la cookie se envíe en solicitudes CORS
            sameSite: isProduction ? 'none' : 'lax', 
        }
    }));

    // Middleware de log
    app.use(morgan('dev'));

    // 4. Configuración de Rutas
    app.use('/usuarios', usuarioRoutes);
    app.use('/entregas', entregasRoutes);
    app.use('/dashboard', DashboardRoutes);

    // Iniciar servidor
    app.listen(3000, () => console.log('Servidor iniciado en puerto 3000'));
}).catch(error => console.error("Error al inicializar la DB:", error));