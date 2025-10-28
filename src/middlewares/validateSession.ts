import { ValidateToken } from "./ValidateToken";
import type { AuthenticatedRequest } from "../interfaces/AutenticatedRequest";
import type { NextFunction } from "express";
import type {ResponseLike} from "../interfaces/ResponseLike";

export class SessionValidator {
  /**
   * Valida la sesión del usuario a partir de un token JWT.
   */
  static async validateSession(
  req: AuthenticatedRequest,
  res: ResponseLike,
  next: NextFunction
): Promise<void> {
  try {
    const token = req.cookies.authToken || req.session.token;
    if (!token) {
      return res.status(401).json({ message: "No se proporcionó token" });
    }

    const user = await ValidateToken.validateTokenJWT(token);
    if (user) {
      req.user = { ...user, id: user.id.toString() };
      return res.json({
        message: "Acceso permitido a área protegida",
        user: req.user,
      });
    } else {
      return res.status(401).json({ message: "Acceso denegado" });
    }
  } catch (error) {
    console.error("Error validando la sesión:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
}