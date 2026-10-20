import DiseaseScan from '../models/DiseaseScan.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Upload crop disease image for scanning
// @route   POST /api/disease-scans
// @access  Private (farmer)
export const createDiseaseScan = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Image is required', 400));
  }

  const { cropName, crop } = req.body;

  const scan = await DiseaseScan.create({
    farmer: req.user._id,
    crop: crop || null,
    cropName: cropName || '',
    image: `/uploads/${req.file.filename}`,
    status: 'pending',
  });

  res.status(201).json({
    success: true,
    scan,
    message: 'Image uploaded. ML analysis integration pending.',
  });
});

// @desc    Get all disease scans for current user (admin sees all)
// @route   GET /api/disease-scans
// @access  Private
export const getDiseaseScans = asyncHandler(async (req, res) => {
  let query = {};

  if (req.user.role === 'farmer') {
    query.farmer = req.user._id;
  }

  const scans = await DiseaseScan.find(query).sort('-createdAt');

  res.status(200).json({ success: true, count: scans.length, scans });
});

// @desc    Get single disease scan
// @route   GET /api/disease-scans/:id
// @access  Private (owner or admin)
export const getDiseaseScanById = asyncHandler(async (req, res, next) => {
  const scan = await DiseaseScan.findById(req.params.id);

  if (!scan) {
    return next(new AppError('Disease scan not found', 404));
  }

  if (req.user.role === 'farmer' && scan.farmer.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to access this scan', 403));
  }

  res.status(200).json({ success: true, scan });
});

// @desc    Update disease scan result (admin / ML service)
// @route   PUT /api/disease-scans/:id/result
// @access  Private (admin)
export const updateDiseaseScanResult = asyncHandler(async (req, res, next) => {
  const scan = await DiseaseScan.findById(req.params.id);

  if (!scan) {
    return next(new AppError('Disease scan not found', 404));
  }

  const { disease, confidence, description, recommendations } = req.body;

  if (!disease) {
    return next(new AppError('Disease name is required', 400));
  }

  scan.result = {
    disease,
    confidence: confidence || 0,
    description: description || '',
    recommendations: recommendations || [],
  };
  scan.status = 'completed';
  await scan.save();

  res.status(200).json({ success: true, scan });
});

// @desc    Delete disease scan
// @route   DELETE /api/disease-scans/:id
// @access  Private (owner or admin)
export const deleteDiseaseScan = asyncHandler(async (req, res, next) => {
  const scan = await DiseaseScan.findById(req.params.id);

  if (!scan) {
    return next(new AppError('Disease scan not found', 404));
  }

  if (req.user.role === 'farmer' && scan.farmer.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to delete this scan', 403));
  }

  await scan.deleteOne();

  res.status(200).json({ success: true, message: 'Disease scan deleted successfully' });
});