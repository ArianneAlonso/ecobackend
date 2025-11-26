import type { Response, NextFunction } from "express";
import { ValidateToken } from "./ValidateToken";
import type { AuthenticatedRequest } from "../interfaces/AutenticatedRequest";
import type { UserRole } from "../interfaces/JwtPayload";

export class SessionValidator {
  static async validateSession(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    // 1. PRIORIDAD: Chequear Sesión (Express-Session)
    // Este es el flujo principal para roles de gestión (administrador, operador).
    if (req.session && req.session.user) {
      req.user = req.session.user;
      return next();
    } // --- 2. FALLBACK: Chequear JWT (Flujo para usuarios estándar) ---

    let token: string | undefined; // 2.1. Intenta obtenerlo de la cookie httpOnly (método preferido para usuarios estándar)

    if (req.cookies && req.cookies.authToken) {
      token = req.cookies.authToken as string;
    } // 2.2. Si no se encontró en la cookie, intenta de "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!token && authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } // 2.3. Si no se encontró, intenta obtenerlo del query string (?token=...)

    if (!token && req.query.token) {
      token = req.query.token as string;
    }
    if (!token) {
      // No hay ni sesión ni token. Acceso denegado.
      return res
        .status(401)
        .json({ message: "Acceso denegado: Se requiere autenticación." });
    } // Usar la utilidad de validación JWT

    const decodedPayload = await ValidateToken.validateTokenJWT(token);

    if (!decodedPayload) {
      return res.status(403).json({ message: "Token inválido o expirado." });
    } // 3. Chequeo de Seguridad (Anti-Reversión): // Bloquear el uso de JWT a los roles de gestión. // Estos roles SIEMPRE deben pasar por el flujo de sesión (Paso 1).
    if (
      decodedPayload.role === "administrador" ||
      decodedPayload.role === "operador"
    ) {
      // Además de bloquear, borramos la cookie para forzar el flujo correcto.
      res.clearCookie("authToken");
      return res.status(403).json({
        message:
          "Acceso prohibido. Este rol debe autenticarse usando el sistema de sesión.",
      });
    } // 4. Si es un Usuario Estándar con JWT válido, continuar

    req.user = decodedPayload;
    next();
  }
}
