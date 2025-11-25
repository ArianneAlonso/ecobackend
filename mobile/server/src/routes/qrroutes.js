import { Router } from 'express';
import { generateQRCode, scanQRCode } from '../controllers/qrcontroller.js';
import { protect, isDriver } from '../middlewares/authmiddleware.js';

const router = Router();

// --- Driver ---
router.post('/generate', protect, isDriver, generateQRCode);

// --- User ---
router.post('/scan', protect, scanQRCode);

export default router;
