import type { AuthenticatedRequest } from "../interfaces/AutenticatedRequest";
import type { ResponseLike } from "../interfaces/ResponseLike";
import type { NextFunction } from "express";

export class SessionValidator {
  static async validateSession(
      req: AuthenticatedRequest,
      res: ResponseLike,
      next: NextFunction
  ): Promise<void> {
      // Verifica directamente si los datos del usuario existen en la sesión
      if (req.session && req.session.user) {
          // Adjunta los datos de la sesión al req.user para que otros middlewares lo usen
          req.user = req.session.user as any; // Ajuste de tipado
          next();
      } else {
          return res.status(401).json({ message: "Acceso denegado: Sesión no encontrada o expirada." });
      }
  }
}