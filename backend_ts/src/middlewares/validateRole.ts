import type { AuthenticatedRequest } from "../interfaces/AutenticatedRequest";
import type { NextFunction, Response } from "express";

// Define los posibles roles para una mejor seguridad de tipos (ej. 'admin' | 'usuario')
type UserRole = 'admin' | 'usuario' | 'operador';

/**
 * Retorna un middleware que verifica si el usuario autenticado tiene un rol permitido.
 * @param allowedRoles Array de roles permitidos (ej. ['admin', 'operador'])
 */
export const validateRole = (allowedRoles: UserRole[]) => {
    return (
        req: AuthenticatedRequest, 
        res: Response, 
        next: NextFunction
    ) => {
        
        const userRole = req.user?.role; 
        
        // Si el rol no está presente o no hay usuario (falló SessionValidator)
        if (!userRole) {
            
            return res.status(403).json({ message: "Acceso denegado: El rol del usuario no está disponible." });
        }

        if (allowedRoles.includes(userRole as UserRole)) {
            next();
        } else {
            // El rol no está en la lista permitida
            return res.status(403).json({ 
                message: "Acceso denegado: Rol de usuario insuficiente.",
                requiredRoles: allowedRoles
            });
        }
    };
};