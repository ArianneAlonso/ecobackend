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
    if (req.session && req.session.user) {
        req.user = req.session.user;
        return next(); 
    }

    // 2. FALLBACK: Chequear JWT 
    
    const authHeader = req.headers.authorization;
    let token = authHeader?.split(' ')[1]; // ➡️ 1. Intenta obtenerlo de "Bearer <token>"

    // ➡️ 2. Si no se encontró, intenta obtenerlo del query string (?token=...)
    if (!token && req.query.token) {
        // req.query puede ser string o array de string, por eso usamos 'as string'
        token = req.query.token as string;
    }
    
    if (!token) {
        // No hay ni sesión ni token. Acceso denegado.
        return res.status(401).json({ message: "Acceso denegado: Se requiere autenticación." });
    }

    // Usar la utilidad de validación JWT
    // NOTA: Asumo que 'decodedPayload.role' está en minúsculas para la comparación.
    const decodedPayload = await ValidateToken.validateTokenJWT(token);

    if (!decodedPayload) {
        return res.status(403).json({ message: "Token inválido o expirado." });
    }
    
    // 3. Chequeo de Seguridad (Anti-Reversión): 
    // Bloquear el uso de JWT a los roles de gestión.
   if (decodedPayload.role === 'administrador' || decodedPayload.role === 'operador') {
        return res.status(403).json({ 
            message: "Acceso prohibido. Este rol debe usar el sistema de sesión." 
        });
    }

    // 4. Si es un Usuario Estándar con JWT válido, continuar
    req.user = decodedPayload;
    next(); 
  }
}