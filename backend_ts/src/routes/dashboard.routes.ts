import { Router } from 'express';
import { DashboardController } from '../controllers/DashboardController';
import { SessionValidator } from '../middlewares/validateSession';
import { validateRole } from '../middlewares/validateRole';

const router = Router();
const dashboardController = new DashboardController();

// Ruta principal para obtener todos los datos del dashboard (KPIs y Gráficos)
router.get(
    '/',
    SessionValidator.validateSession,
    // Solo Administradores y Operadores deberían ver estos datos
    validateRole(['administrador']),
    dashboardController.getKpis
);

export default router;