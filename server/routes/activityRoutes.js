import express from 'express';
import {
  createActivity,
  getActivities,
  updateActivity,
  deleteActivity,
} from '../controllers/activityController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .post(protect, upload.array('images', 5), createActivity)
  .get(protect, getActivities);

router.route('/:id')
  .put(protect, upload.array('images', 5), updateActivity)
  .delete(protect, deleteActivity);

export default router;