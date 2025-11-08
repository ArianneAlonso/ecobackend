// src/middlewares/validateSession.ts
import { ValidateToken } from "./ValidateToken";
import type { AuthenticatedRequest } from "../interfaces/AutenticatedRequest"; // Importamos la interfaz
import type { JwtPayload } from "../interfaces/JwtPayload";
import type { NextFunction } from "express";
import type {ResponseLike} from "../interfaces/ResponseLike";

export class SessionValidator {
 
  static async validateSession(
      req: AuthenticatedRequest,
      res: ResponseLike,
      next: NextFunction
  ): Promise<void> {
      try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ message: "No se proporcionó token" });
        }

        // Asumimos que ValidateToken.validateTokenJWT retorna JwtPayload | null/undefined
        const user = await ValidateToken.validateTokenJWT(token) as (JwtPayload | null | undefined);
        
        if (user) {
            // El 'user' (payload) ya tiene la estructura correcta (id, email, role)
            
            // La conversión del ID es opcional; solo hazla si TypeORM o tu lógica
            // requiere que el ID en req.user sea *siempre* un string.
            const payload: JwtPayload = { 
                ...user, 
                id: (user.id), // Asegura que el ID sea un string
            };

            req.user = payload;
      
            next(); // Token válido y usuario adjunto
        } else {
            // Token inválido o expirado
            return res.status(401).json({ message: "Acceso denegado: Token inválido o expirado" });
        }
      } catch (error) {
        console.error("Error validando la sesión:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
      }
  }
}