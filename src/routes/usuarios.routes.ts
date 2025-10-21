import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express'; // Aseguramos los tipos para middleware
import { UsuariosController } from '../controllers/usuarios.controllers';
import { body, validationResult } from 'express-validator'; // Importamos express-validator

const router = Router();
const controller = new UsuariosController();

// Middleware para manejar los resultados de la validación y responder con errores 400
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Mapear errores para una respuesta más limpia y solo con el primer error por campo
        const extractedErrors: Record<string, string> = {};
        errors.array({ onlyFirstError: true }).forEach(err => {
            // 'path' es la propiedad que contiene el nombre del campo en versiones recientes
            const key = (err as any).path; 
            if (key) {
                extractedErrors[key] = err.msg;
            }
        });
        
        return res.status(400).json({ 
            mensaje: 'Errores de validación en la solicitud',
            errores: extractedErrors 
        });
    }
    next();
};

// Validaciones para el registro de usuarios (nombre, email y password)
const registroValidation = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio.'),
    body('email').isEmail().withMessage('El formato del email no es válido.'),
    body('email').notEmpty().withMessage('El email es obligatorio.'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    handleValidationErrors // Ejecutar el manejador de errores
];

// Validaciones para el inicio de sesión (email y password)
const loginValidation = [
    body('email').isEmail().withMessage('El formato del email no es válido.'),
    body('email').notEmpty().withMessage('El email es obligatorio.'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria.'),
    handleValidationErrors // Ejecutar el manejador de errores
];


/**
 * Define las rutas específicas para el recurso '/usuarios'.
 */

// POST /usuarios/registrar - Ruta para el registro de nuevos usuarios
router.post('/registrar', registroValidation, controller.crearUsuario);

// POST /usuarios/login - Ruta para el inicio de sesión
router.post('/login', loginValidation, controller.iniciarSesion);

// GET /usuarios/ - Obtiene la lista de todos los usuarios
router.get('/', controller.obtenerUsuarios);

// GET /usuarios/:id - Obtiene un usuario por su ID
router.get('/:id', controller.obtenerUsuarioPorId);

// Nota: Puedes considerar añadir un middleware de autenticación (JWT)
// para proteger las rutas GET / y GET /:id en un entorno de producción.

export default router;
