import type { Request } from 'express';
import type { JwtPayload } from './JwtPayload';

// Define un tipo para los roles
export type UserRole = 'administrador' | 'usuario' | 'operador';

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload; 
}