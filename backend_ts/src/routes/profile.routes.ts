import { Router } from 'express';
// Importamos el controlador
import { getProfile, updateProfile } from '../controllers/profile.controller'; 
// Importamos los middlewares de seguridad
import { SessionValidator } from '../middlewares/validateSession';
import { authorizeRole } from '../middlewares/validateRole';

const router = Router();

// --------------------------------------------------------------------------
// RUTAS DEL PERFIL DEL USUARIO AUTENTICADO
// --------------------------------------------------------------------------

/**
 * GET /api/profile
 * Obtiene la información del perfil del usuario actualmente autenticado (yo).
 * Requisitos: Estar autenticado (cualquier rol).
 */
router.get(
    '/', 
    SessionValidator.validateSession, // 1. Verifica si existe JWT o Sesión
    getProfile // Ejecuta el controlador
);

/**
 * PUT /api/profile
 * Actualiza la información básica del perfil del usuario.
 * Requisitos: Estar autenticado (cualquier rol).
 */
router.put(
    '/', 
    SessionValidator.validateSession, // 1. Verifica si existe JWT o Sesión
    // NOTA: Se podrían añadir validaciones aquí con express-validator si fuera necesario
    updateProfile // Ejecuta el controlador
);


// --------------------------------------------------------------------------
// RUTA OPCIONAL (EJEMPLO): Perfiles que solo Administradores pueden ver por ID
// --------------------------------------------------------------------------
/*
router.get(
    '/:id', 
    SessionValidator.validateSession,
    authorizeRole(['administrador']), // Solo administradores pueden ver perfiles de otros
    // Aquí iría un nuevo controlador: getProfileById
);
*/

export default router;