import express from 'express';
import {
  getExperts,
  getExpertById,
  createExpert,
  updateExpert,
  deleteExpert,
  createExpertQuery,
  getExpertQueries,
  answerExpertQuery,
  closeExpertQuery,
} from '../controllers/expertController.js';
import { protect, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Expert queries (must come before /:id)
router.route('/queries')
  .post(protect, upload.array('images', 5), createExpertQuery)
  .get(protect, getExpertQueries);

router.put('/queries/:id/answer', protect, answerExpertQuery);
router.put('/queries/:id/close', protect, closeExpertQuery);

// Expert profiles
router.route('/')
  .get(getExperts)
  .post(protect, authorize('admin'), createExpert);

router.route('/:id')
  .get(getExpertById)
  .put(protect, updateExpert)
  .delete(protect, authorize('admin'), deleteExpert);

export default router;