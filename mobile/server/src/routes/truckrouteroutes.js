import express from 'express';
import { createRoute, startRoute, getActiveRouteForZone } from '../controllers/truckroutecontroller.js';
import { protect, isAdmin, isDriver } from '../middlewares/authmiddleware.js';

const router = express.Router();

router.post('/', protect, isAdmin, createRoute);
router.post('/:id/start', protect, isDriver, startRoute);
router.get('/active', protect, getActiveRouteForZone);

export default router;
