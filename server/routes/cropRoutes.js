import express from 'express';
import {
  createCrop,
  getCrops,
  getCropById,
  updateCrop,
  deleteCrop,
} from '../controllers/cropController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createCrop)
  .get(protect, getCrops);

router.route('/:id')
  .get(protect, getCropById)
  .put(protect, updateCrop)
  .delete(protect, deleteCrop);

export default router;