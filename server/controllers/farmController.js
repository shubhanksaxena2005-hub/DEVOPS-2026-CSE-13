import Farm from '../models/Farm.js';
import Crop from '../models/Crop.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Create a new farm
// @route   POST /api/farms
// @access  Private (farmer)
export const createFarm = asyncHandler(async (req, res, next) => {
  const { name, location, landArea, landUnit, soilType, soilPh, nitrogen, phosphorus, potassium, waterSource, activeSince } = req.body;

  if (!name || !landArea) {
    return next(new AppError('Farm name and land area are required', 400));
  }

  const farm = await Farm.create({
    farmer: req.user._id,
    name,
    location: location || {},
    landArea,
    landUnit: landUnit || 'acres',
    soilType: soilType || '',
    soilPh: soilPh || null,
    nitrogen: nitrogen || 0,
    phosphorus: phosphorus || 0,
    potassium: potassium || 0,
    waterSource: waterSource || '',
    activeSince: activeSince || '',
  });

  res.status(201).json({ success: true, farm });
});

// @desc    Get all farms for current user (admin sees all)
// @route   GET /api/farms
// @access  Private
export const getFarms = asyncHandler(async (req, res) => {
  let query = {};

  if (req.user.role === 'farmer') {
    query.farmer = req.user._id;
  }

  const farms = await Farm.find(query)
    .populate('farmer', 'name email phone')
    .sort('-createdAt');

  res.status(200).json({ success: true, count: farms.length, farms });
});

// @desc    Get single farm
// @route   GET /api/farms/:id
// @access  Private (owner or admin)
export const getFarmById = asyncHandler(async (req, res, next) => {
  const farm = await Farm.findById(req.params.id).populate('farmer', 'name email phone');

  if (!farm) {
    return next(new AppError('Farm not found', 404));
  }

  // Farmers can only access their own farms
  if (req.user.role === 'farmer' && farm.farmer._id.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to access this farm', 403));
  }

  res.status(200).json({ success: true, farm });
});

// @desc    Update farm
// @route   PUT /api/farms/:id
// @access  Private (owner or admin)
export const updateFarm = asyncHandler(async (req, res, next) => {
  let farm = await Farm.findById(req.params.id);

  if (!farm) {
    return next(new AppError('Farm not found', 404));
  }

  if (req.user.role === 'farmer' && farm.farmer.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to update this farm', 403));
  }

  const fields = ['name', 'location', 'landArea', 'landUnit', 'soilType', 'soilPh', 'nitrogen', 'phosphorus', 'potassium', 'waterSource', 'activeSince'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      farm[field] = req.body[field];
    }
  });

  await farm.save();

  res.status(200).json({ success: true, farm });
});

// @desc    Delete farm
// @route   DELETE /api/farms/:id
// @access  Private (owner or admin)
export const deleteFarm = asyncHandler(async (req, res, next) => {
  const farm = await Farm.findById(req.params.id);

  if (!farm) {
    return next(new AppError('Farm not found', 404));
  }

  if (req.user.role === 'farmer' && farm.farmer.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to delete this farm', 403));
  }

  // Delete related crops
  await Crop.deleteMany({ farm: farm._id });

  await farm.deleteOne();

  res.status(200).json({ success: true, message: 'Farm deleted successfully' });
});