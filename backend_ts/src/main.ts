import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source.js';
import usuarioRoutes from './routes/usuarios.routes.js';
import entregasRoutes from './routes/entrega.routes.js';
import DashboardRoutes from './routes/dashboard.routes.js';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 
import * as http from 'http'; // 1. IMPORTAR MÓDULO HTTP

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
        // Esto es ESENCIAL para que las cookies de sesión (connect.sid y authToken) sean aceptadas.
        credentials: true, 
    }));

    // 3. MIDDLEWARE CLAVE: Para que Express pueda leer las cookies JWT (authToken)
    // Debe ir antes de cualquier validador de cookies.
    app.use(cookieParser()); 

    // 4. Configuración de EXPRESS-SESSION
    app.use(session({
        secret: process.env.SESSION_SECRET || 'mi-clave-secreta-fuerte',
        resave: false,
        saveUninitialized: false,
        cookie: { 
            maxAge: 1000 * 60 * 60 * 24, // 24 horas
            httpOnly: true, 
            secure: isProduction, 
            sameSite: isProduction ? 'none' : 'lax', 
        }
    }));

    // Middleware de log
    app.use(morgan('dev'));

    // 5. Configuración de Rutas
    app.use('/usuarios', usuarioRoutes);
    app.use('/entregas', entregasRoutes);
    app.use('/dashboard', DashboardRoutes);

    // 6. Iniciar servidor con tamaño de encabezado aumentado
    // AUMENTADO A 64KB (65536 bytes) para resolver el 400 Bad Request causado por cookies grandes.
    const server = http.createServer({ maxHeaderSize: 65536 }, app);
    server.listen(3000, () => console.log('Servidor iniciado en puerto 3000 (Max Header Size aumentado a 64KB)'));

}).catch(error => console.error("Error al inicializar la DB:", error));