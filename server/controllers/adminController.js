import User from '../models/User.js';
import Expert from '../models/Expert.js';
import Farm from '../models/Farm.js';
import Crop from '../models/Crop.js';
import Expense from '../models/Expense.js';
import ExpertQuery from '../models/ExpertQuery.js';
import GovernmentScheme from '../models/GovernmentScheme.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all farmers (admin)
// @route   GET /api/admin/farmers
// @access  Private (admin)
export const getFarmers = asyncHandler(async (req, res) => {
  const { search, status } = req.query;
  const query = { role: 'farmer' };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ];
  }

  if (status) {
    if (status === 'active') query.isActive = true;
    if (status === 'inactive') query.isActive = false;
  }

  const farmers = await User.find(query).select('-password').sort('-createdAt');

  const farmerIds = farmers.map((f) => f._id);

  // Aggregate farm and crop counts
  const farmCounts = await Farm.aggregate([
    { $match: { farmer: { $in: farmerIds } } },
    { $group: { _id: '$farmer', totalArea: { $sum: '$landArea' }, count: { $sum: 1 } } },
  ]);

  const cropCounts = await Crop.aggregate([
    { $match: { farmer: { $in: farmerIds } } },
    { $group: { _id: '$farmer', count: { $sum: 1 } } },
  ]);

  const enrichedFarmers = farmers.map((farmer) => {
    const farmData = farmCounts.find((fc) => fc._id.toString() === farmer._id.toString());
    const cropData = cropCounts.find((cc) => cc._id.toString() === farmer._id.toString());
    return {
      ...farmer.toObject(),
      farmCount: farmData?.count || 0,
      totalArea: farmData?.totalArea || 0,
      cropCount: cropData?.count || 0,
    };
  });

  res.status(200).json({ success: true, count: enrichedFarmers.length, farmers: enrichedFarmers });
});

// @desc    Update farmer status (admin)
// @route   PUT /api/admin/farmers/:id
// @access  Private (admin)
export const updateFarmer = asyncHandler(async (req, res, next) => {
  const farmer = await User.findById(req.params.id).select('-password');

  if (!farmer || farmer.role !== 'farmer') {
    return next(new AppError('Farmer not found', 404));
  }

  const { name, phone, location, isActive } = req.body;
  if (name) farmer.name = name;
  if (phone) farmer.phone = phone;
  if (location) farmer.location = { ...farmer.location, ...location };
  if (isActive !== undefined) farmer.isActive = isActive;

  await farmer.save();

  res.status(200).json({ success: true, farmer });
});

// @desc    Delete farmer (admin)
// @route   DELETE /api/admin/farmers/:id
// @access  Private (admin)
export const deleteFarmer = asyncHandler(async (req, res, next) => {
  const farmer = await User.findById(req.params.id);

  if (!farmer || farmer.role !== 'farmer') {
    return next(new AppError('Farmer not found', 404));
  }

  // Clean up related data
  await Farm.deleteMany({ farmer: farmer._id });
  await Crop.deleteMany({ farmer: farmer._id });
  await Expense.deleteMany({ farmer: farmer._id });
  await ExpertQuery.deleteMany({ farmer: farmer._id });
  await farmer.deleteOne();

  res.status(200).json({ success: true, message: 'Farmer and related data deleted successfully' });
});

// @desc    Get all experts (admin)
// @route   GET /api/admin/experts
// @access  Private (admin)
export const getExpertsAdmin = asyncHandler(async (req, res) => {
  const { search, status } = req.query;
  const query = { role: 'expert' };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const experts = await User.find(query).select('-password').sort('-createdAt');

  const expertIds = experts.map((e) => e._id);
  const expertProfiles = await Expert.find({ user: { $in: expertIds } });

  const enrichedExperts = experts.map((expert) => {
    const profile = expertProfiles.find((ep) => ep.user.toString() === expert._id.toString());
    return {
      ...expert.toObject(),
      expertProfile: profile || null,
    };
  });

  res.status(200).json({ success: true, count: enrichedExperts.length, experts: enrichedExperts });
});

// @desc    Update expert profile (admin)
// @route   PUT /api/admin/experts/:id
// @access  Private (admin)
export const updateExpertAdmin = asyncHandler(async (req, res, next) => {
  const expert = await Expert.findById(req.params.id);

  if (!expert) {
    return next(new AppError('Expert not found', 404));
  }

  const fields = ['specialty', 'experience', 'location', 'rating', 'consultations', 'available', 'languages', 'bio', 'availability', 'price', 'isActive'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      expert[field] = req.body[field];
    }
  });

  await expert.save();

  res.status(200).json({ success: true, expert });
});

// @desc    Delete expert (admin)
// @route   DELETE /api/admin/experts/:id
// @access  Private (admin)
export const deleteExpertAdmin = asyncHandler(async (req, res, next) => {
  const expert = await Expert.findById(req.params.id);

  if (!expert) {
    return next(new AppError('Expert not found', 404));
  }

  await ExpertQuery.deleteMany({ expert: expert._id });
  await User.findByIdAndDelete(expert.user);
  await expert.deleteOne();

  res.status(200).json({ success: true, message: 'Expert deleted successfully' });
});

// @desc    Get admin stats for dashboard
// @route   GET /api/admin/stats
// @access  Private (admin)
export const getAdminStats = asyncHandler(async (req, res) => {
  const [totalFarmers, totalExperts, totalSchemes, totalCrops, totalExpenses] = await Promise.all([
    User.countDocuments({ role: 'farmer' }),
    User.countDocuments({ role: 'expert' }),
    GovernmentScheme.countDocuments({ isActive: true }),
    Crop.countDocuments({ isActive: true }),
    Expense.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    stats: {
      totalFarmers,
      totalExperts,
      totalSchemes,
      totalCrops,
      totalExpenses,
    },
  });
});