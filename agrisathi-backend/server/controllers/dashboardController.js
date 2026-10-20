import Farm from '../models/Farm.js';
import Crop from '../models/Crop.js';
import Expense from '../models/Expense.js';
import FarmActivity from '../models/FarmActivity.js';
import GovernmentScheme from '../models/GovernmentScheme.js';
import Expert from '../models/Expert.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get farmer dashboard data
// @route   GET /api/dashboard
// @access  Private
export const getDashboard = asyncHandler(async (req, res) => {
  if (req.user.role === 'admin') {
    // Admin dashboard
    const [totalFarmers, activeCrops, totalSchemes, totalExperts, recentActivities, recentExpenses] =
      await Promise.all([
        Farm.countDocuments(),
        Crop.countDocuments({ isActive: true }),
        GovernmentScheme.countDocuments({ isActive: true }),
        Expert.countDocuments({ isActive: true }),
        FarmActivity.find().sort('-createdAt').limit(5),
        Expense.find().sort('-createdAt').limit(5),
      ]);

    return res.status(200).json({
      success: true,
      dashboard: {
        stats: {
          totalFarms: totalFarmers,
          activeCrops,
          totalSchemes,
          totalExperts,
        },
        recentActivities,
        recentExpenses,
      },
    });
  }

  // Farmer-specific dashboard — everything is computed from the farmer's own records
  const farmer = req.user._id;
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [farms, expenseCount, recentExpenses, byCategory, monthTotals, activityCount, recentActivities] =
    await Promise.all([
      Farm.find({ farmer }).sort('-createdAt'),
      Expense.countDocuments({ farmer }),
      Expense.find({ farmer }).sort('-date').limit(5),
      Expense.aggregate([
        { $match: { farmer } },
        { $group: { _id: '$category', total: { $sum: '$amount' } } },
        { $sort: { total: -1 } },
      ]),
      Expense.aggregate([
        { $match: { farmer, date: { $gte: monthStart } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      FarmActivity.countDocuments({ farmer }),
      FarmActivity.find({ farmer }).sort('-date').limit(5),
    ]);

  res.status(200).json({
    success: true,
    dashboard: {
      farmer: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        location: req.user.location,
      },
      farmsSummary: {
        count: farms.length,
        totalArea: farms.reduce((sum, f) => sum + (f.landArea || 0), 0),
        farms,
      },
      expensesSummary: {
        count: expenseCount,
        total: byCategory.reduce((sum, c) => sum + c.total, 0),
        thisMonth: monthTotals[0]?.total || 0,
        byCategory: byCategory.map((c) => ({ category: c._id, total: c.total })),
      },
      activitiesSummary: {
        count: activityCount,
      },
      recentExpenses,
      recentActivities,
    },
  });
});
