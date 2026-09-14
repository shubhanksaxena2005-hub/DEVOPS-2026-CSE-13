import FarmActivity from '../models/FarmActivity.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Create a new farm activity
// @route   POST /api/activities
// @access  Private (farmer)
export const createActivity = asyncHandler(async (req, res, next) => {
  const { date, title, activityType, crop, cropName, notes, timeSpent, farm } = req.body;

  if (!title) {
    return next(new AppError('Activity title is required', 400));
  }

  const images = req.files ? req.files.map((f) => `/uploads/${f.filename}`) : [];

  const activity = await FarmActivity.create({
    farmer: req.user._id,
    farm: farm || null,
    crop: crop || null,
    date: date || Date.now(),
    title,
    activityType: activityType || 'Other',
    cropName: cropName || '',
    notes: notes || '',
    timeSpent: timeSpent || '',
    images,
  });

  res.status(201).json({ success: true, activity });
});

// @desc    Get all activities for current user (admin sees all)
// @route   GET /api/activities
// @access  Private
export const getActivities = asyncHandler(async (req, res) => {
  let query = {};

  if (req.user.role === 'farmer') {
    query.farmer = req.user._id;
  }

  const activities = await FarmActivity.find(query)
    .populate('crop', 'name')
    .sort('-date');

  res.status(200).json({ success: true, count: activities.length, activities });
});

// @desc    Update activity
// @route   PUT /api/activities/:id
// @access  Private (owner or admin)
export const updateActivity = asyncHandler(async (req, res, next) => {
  let activity = await FarmActivity.findById(req.params.id);

  if (!activity) {
    return next(new AppError('Activity not found', 404));
  }

  if (req.user.role === 'farmer' && activity.farmer.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to update this activity', 403));
  }

  const fields = ['date', 'title', 'activityType', 'crop', 'cropName', 'notes', 'timeSpent', 'farm'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      activity[field] = req.body[field];
    }
  });

  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((f) => `/uploads/${f.filename}`);
    activity.images = [...activity.images, ...newImages];
  }

  await activity.save();

  res.status(200).json({ success: true, activity });
});

// @desc    Delete activity
// @route   DELETE /api/activities/:id
// @access  Private (owner or admin)
export const deleteActivity = asyncHandler(async (req, res, next) => {
  const activity = await FarmActivity.findById(req.params.id);

  if (!activity) {
    return next(new AppError('Activity not found', 404));
  }

  if (req.user.role === 'farmer' && activity.farmer.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to delete this activity', 403));
  }

  await activity.deleteOne();

  res.status(200).json({ success: true, message: 'Activity deleted successfully' });
});