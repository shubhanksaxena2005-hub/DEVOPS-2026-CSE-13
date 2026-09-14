import express from 'express';
import {
  getSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme,
} from '../controllers/schemeController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getSchemes)
  .post(protect, authorize('admin'), createScheme);

router.route('/:id')
  .get(getSchemeById)
  .put(protect, authorize('admin'), updateScheme)
  .delete(protect, authorize('admin'), deleteScheme);

export default router;