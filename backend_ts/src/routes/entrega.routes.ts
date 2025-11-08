// src/routes/entrega.routes.ts
import { Router } from 'express';
import { EntregasController } from '../controllers/entrega.controller';
import { SessionValidator } from '../middlewares/validateSession';
import { validateRole } from '../middlewares/validateRole';

const router = Router();

router.post('/crear', SessionValidator.validateSession, validateRole(['admin']), EntregasController.crearEntrega);

export default router;