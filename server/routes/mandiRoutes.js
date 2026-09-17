import express from 'express';
import {
  getMandiPrices,
  getMandiPriceByCrop,
  getMarkets,
  createMandiPrice,
  updateMandiPrice,
  deleteMandiPrice,
} from '../controllers/mandiController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Order matters: /markets must come before /:crop
router.get('/markets', getMarkets);

router.route('/')
  .get(getMandiPrices)
  .post(protect, authorize('admin'), createMandiPrice);

// Get by crop name (public)
router.get('/:crop', getMandiPriceByCrop);

// Admin update/delete by ID
router.put('/:id', protect, authorize('admin'), updateMandiPrice);
router.delete('/:id', protect, authorize('admin'), deleteMandiPrice);

export default router;