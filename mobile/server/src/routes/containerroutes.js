import { Router } from 'express';
import {
  getContainers,
  createContainer,
  updateContainer,
  deleteContainer
} from '../controllers/containercontroller.js';
import { protect, isAdmin } from '../middlewares/authmiddleware.js';

const router = Router();

router.route('/')
  .get(getContainers)
  .post(protect, isAdmin, createContainer);

router.route('/:id')
  .put(protect, isAdmin, updateContainer)
  .delete(protect, isAdmin, deleteContainer);

export default router;