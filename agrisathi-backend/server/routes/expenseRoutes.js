import express from 'express';
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from '../controllers/expenseController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .post(protect, upload.single('billImage'), createExpense)
  .get(protect, getExpenses);

router.route('/:id')
  .put(protect, upload.single('billImage'), updateExpense)
  .delete(protect, deleteExpense);

export default router;