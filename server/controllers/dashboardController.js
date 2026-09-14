import Farm from '../models/Farm.js';
import Crop from '../models/Crop.js';
import Expense from '../models/Expense.js';
import FarmActivity from '../models/FarmActivity.js';
import Notification from '../models/Notification.js';
import MandiPrice from '../models/MandiPrice.js';
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

  // Farmer-specific dashboard
  const [farms, crops, expenses, activities, notifications, mandiPrices] = await Promise.all([
    Farm.find({ farmer: req.user._id }).sort('-createdAt'),
    Crop.find({ farmer: req.user._id, isActive: true }).sort('-createdAt'),
    Expense.find({ farmer: req.user._id }).sort('-date').limit(5),
    Notification.find({ user: req.user._id }).sort('-createdAt').limit(10),
    MandiPrice.find().sort('-date').limit(5),
  ]);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const activeCrops = crops.filter((c) => c.isActive !== false);

  res.status(200).json({
    success: true,
    dashboard: {
      farmer: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        location: req.user.location,
        profileImage: req.user.profileImage,
      },
      farms,
      farmsSummary: {
        count: farms.length,
        totalArea: farms.reduce((sum, f) => sum + (f.landArea || 0), 0),
      },
      crops: activeCrops,
      cropsSummary: {
        count: activeCrops.length,
      },
      expenses: expenses.slice(0, 5),
      expensesSummary: {
        total: totalExpenses,
        recentCount: expenses.length,
      },
      activities: await FarmActivity.find({ farmer: req.user._id }).sort('-date').limit(5),
      notifications,
      unreadNotifications: notifications.filter((n) => !n.read).length,
      // Weather placeholder — no live API connected yet
      weather: {
        isPlaceholder: true,
        location: req.user.location?.district || req.user.location?.state || 'Unknown',
        note: 'Live weather data not connected. Integrate a weather API to receive real forecasts.',
      },
      // Mandi placeholders
      mandi: {
        isPlaceholder: true,
        message: 'Browsing sample mandi data',
        prices: mandiPrices.map((p) => ({
          crop: p.crop,
          market: p.market,
          current: p.current,
          previous: p.previous,
          change: p.change,
          changePercent: p.changePercent,
          unit: p.unit,
          date: p.date,
          isSample: p.isSample || true,
        })),
      },
    },
  });
});