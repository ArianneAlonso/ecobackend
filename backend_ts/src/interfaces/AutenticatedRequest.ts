import type { Request } from 'express';
import { Session } from 'express-session';

// Define un tipo para los roles para garantizar la seguridad de tipos
type UserRole = 'admin' | 'usuario' | 'operador';

export interface AuthenticatedRequest extends Request {
  session: Session & {
    token?: string;
  };
  user?: {
    id: string;
    email: string; // Es útil para el token
    role: UserRole; // <<-- ¡AÑADIDO PARA RESOLVER EL ERROR!
    // otras propiedades opcionales
  };
}