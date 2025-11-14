import type { Response, NextFunction } from "express";
import { ValidateToken } from './ValidateToken'; 
import type { AuthenticatedRequest } from "../interfaces/AutenticatedRequest";
import type { UserRole } from '../interfaces/JwtPayload';

export class SessionValidator {
  static async validateSession(
      req: AuthenticatedRequest,
      res: Response,
      next: NextFunction
  ): Promise<Response | void> {

    // 1. PRIORIDAD: Chequear Sesión (Express-Session)
    // Usado por roles de gestión: Administrador y Operario.
    if (req.session && req.session.user) {
        req.user = req.session.user;
        return next(); 
    }

    // 2. FALLBACK: Chequear JWT 
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        // Devuelve un objeto Response
        return res.status(401).json({ message: "Acceso denegado: Se requiere autenticación." });
    }

    // Usar la utilidad de validación JWT
    const decodedPayload = await ValidateToken.validateTokenJWT(token);

    if (!decodedPayload) {
        // Devuelve un objeto Response
        return res.status(403).json({ message: "Token inválido o expirado." });
    }
    
    // 3. Chequeo de Seguridad (Anti-Reversión): 
   if (decodedPayload.role === 'administrador' || decodedPayload.role === 'operador') {
        // Devuelve un objeto Response
        return res.status(403).json({ 
            message: "Acceso prohibido. Este rol debe usar el sistema de sesión." 
        });
    }

    // 4. Si es un Usuario Estándar con JWT válido, continuar
    req.user = decodedPayload;
    next(); // Llama a next(), lo cual implícitamente retorna void.
  }
}