import express from 'express';
import {
  getFarmers,
  updateFarmer,
  deleteFarmer,
  getExpertsAdmin,
  updateExpertAdmin,
  deleteExpertAdmin,
  getAdminStats,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require admin role
router.use(protect, authorize('admin'));

router.get('/stats', getAdminStats);

router.route('/farmers')
  .get(getFarmers);

router.route('/farmers/:id')
  .put(updateFarmer)
  .delete(deleteFarmer);

router.route('/experts')
  .get(getExpertsAdmin);

router.route('/experts/:id')
  .put(updateExpertAdmin)
  .delete(deleteExpertAdmin);

export default router;