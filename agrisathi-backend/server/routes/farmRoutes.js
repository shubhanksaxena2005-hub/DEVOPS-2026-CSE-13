import express from 'express';
import {
  createFarm,
  getFarms,
  getFarmById,
  updateFarm,
  deleteFarm,
} from '../controllers/farmController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createFarm)
  .get(protect, getFarms);

router.route('/:id')
  .get(protect, getFarmById)
  .put(protect, updateFarm)
  .delete(protect, deleteFarm);

export default router;