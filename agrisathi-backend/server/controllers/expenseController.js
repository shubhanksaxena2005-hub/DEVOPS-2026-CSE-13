import Expense from '../models/Expense.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Create a new expense
// @route   POST /api/expenses
// @access  Private (farmer)
export const createExpense = asyncHandler(async (req, res, next) => {
  const { date, category, description, amount, farm, crop } = req.body;

  if (!description || !amount) {
    return next(new AppError('Description and amount are required', 400));
  }

  const expense = await Expense.create({
    farmer: req.user._id,
    farm: farm || null,
    crop: crop || null,
    date: date || Date.now(),
    category: category || 'Other',
    description,
    amount,
    billImage: req.file ? `/uploads/${req.file.filename}` : '',
  });

  res.status(201).json({ success: true, expense });
});

// @desc    Get all expenses for current user (admin sees all) with totals
// @route   GET /api/expenses
// @access  Private
export const getExpenses = asyncHandler(async (req, res) => {
  let query = {};

  if (req.user.role === 'farmer') {
    query.farmer = req.user._id;
  }

  const expenses = await Expense.find(query)
    .populate('crop', 'name')
    .sort('-date');

  // Totals for dashboard analytics
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Category-wise totals
  const categoryTotals = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  res.status(200).json({
    success: true,
    count: expenses.length,
    totalAmount,
    categoryTotals,
    expenses,
  });
});

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private (owner or admin)
export const updateExpense = asyncHandler(async (req, res, next) => {
  let expense = await Expense.findById(req.params.id);

  if (!expense) {
    return next(new AppError('Expense not found', 404));
  }

  if (req.user.role === 'farmer' && expense.farmer.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to update this expense', 403));
  }

  const fields = ['date', 'category', 'description', 'amount', 'farm', 'crop'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      expense[field] = req.body[field];
    }
  });

  if (req.file) {
    expense.billImage = `/uploads/${req.file.filename}`;
  }

  await expense.save();

  res.status(200).json({ success: true, expense });
});

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private (owner or admin)
export const deleteExpense = asyncHandler(async (req, res, next) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return next(new AppError('Expense not found', 404));
  }

  if (req.user.role === 'farmer' && expense.farmer.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to delete this expense', 403));
  }

  await expense.deleteOne();

  res.status(200).json({ success: true, message: 'Expense deleted successfully' });
});