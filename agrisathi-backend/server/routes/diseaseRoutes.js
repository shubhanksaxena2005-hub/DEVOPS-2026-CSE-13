import express from 'express';
import {
  createDiseaseScan,
  getDiseaseScans,
  getDiseaseScanById,
  updateDiseaseScanResult,
  deleteDiseaseScan,
} from '../controllers/diseaseController.js';
import { protect, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .post(protect, upload.single('image'), createDiseaseScan)
  .get(protect, getDiseaseScans);

router.route('/:id')
  .get(protect, getDiseaseScanById)
  .delete(protect, deleteDiseaseScan);

router.put('/:id/result', protect, authorize('admin'), updateDiseaseScanResult);

export default router;