import Crop from '../models/Crop.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Create a new crop
// @route   POST /api/crops
// @access  Private (farmer)
export const createCrop = asyncHandler(async (req, res, next) => {
  const { name, variety, area, areaUnit, plantedDate, expectedHarvestDate, status, health, soilType, progress, season, stage, notes, farm } = req.body;

  if (!name || !area) {
    return next(new AppError('Crop name and area are required', 400));
  }

  const crop = await Crop.create({
    farmer: req.user._id,
    farm: farm || null,
    name,
    variety: variety || '',
    area,
    areaUnit: areaUnit || 'acres',
    plantedDate: plantedDate || null,
    expectedHarvestDate: expectedHarvestDate || null,
    status: status || 'Growing',
    health: health || 'Good',
    soilType: soilType || '',
    progress: progress || 0,
    season: season || '',
    stage: stage || '',
    notes: notes || '',
  });

  res.status(201).json({ success: true, crop });
});

// @desc    Get all crops for current user (admin sees all)
// @route   GET /api/crops
// @access  Private
export const getCrops = asyncHandler(async (req, res) => {
  let query = {};

  if (req.user.role === 'farmer') {
    query.farmer = req.user._id;
  }

  // Optional farm filter
  if (req.query.farm) {
    query.farm = req.query.farm;
  }

  const crops = await Crop.find(query)
    .populate('farm', 'name location')
    .sort('-createdAt');

  res.status(200).json({ success: true, count: crops.length, crops });
});

// @desc    Get single crop
// @route   GET /api/crops/:id
// @access  Private (owner or admin)
export const getCropById = asyncHandler(async (req, res, next) => {
  const crop = await Crop.findById(req.params.id).populate('farm', 'name location');

  if (!crop) {
    return next(new AppError('Crop not found', 404));
  }

  if (req.user.role === 'farmer' && crop.farmer.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to access this crop', 403));
  }

  res.status(200).json({ success: true, crop });
});

// @desc    Update crop
// @route   PUT /api/crops/:id
// @access  Private (owner or admin)
export const updateCrop = asyncHandler(async (req, res, next) => {
  let crop = await Crop.findById(req.params.id);

  if (!crop) {
    return next(new AppError('Crop not found', 404));
  }

  if (req.user.role === 'farmer' && crop.farmer.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to update this crop', 403));
  }

  const fields = ['name', 'variety', 'area', 'areaUnit', 'plantedDate', 'expectedHarvestDate', 'status', 'health', 'soilType', 'progress', 'season', 'stage', 'notes', 'isActive', 'farm'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      crop[field] = req.body[field];
    }
  });

  await crop.save();

  res.status(200).json({ success: true, crop });
});

// @desc    Delete crop
// @route   DELETE /api/crops/:id
// @access  Private (owner or admin)
export const deleteCrop = asyncHandler(async (req, res, next) => {
  const crop = await Crop.findById(req.params.id);

  if (!crop) {
    return next(new AppError('Crop not found', 404));
  }

  if (req.user.role === 'farmer' && crop.farmer.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to delete this crop', 403));
  }

  await crop.deleteOne();

  res.status(200).json({ success: true, message: 'Crop deleted successfully' });
});