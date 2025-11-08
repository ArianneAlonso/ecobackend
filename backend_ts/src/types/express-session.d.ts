import 'express-session';
// Importa el payload definido por tu aplicación (donde id: string o number, según el caso)
import type { JwtPayload } from '../interfaces/JwtPayload'; 

// Sobrescribe la declaración de módulo de 'express-session'
declare module 'express-session' {
    interface SessionData {
        user?: JwtPayload; 
        token?: string;
    }
}