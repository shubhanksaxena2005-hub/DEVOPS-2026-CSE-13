import GovernmentScheme from '../models/GovernmentScheme.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all government schemes (public)
// @route   GET /api/schemes
// @access  Public  (with optional filters: state, category, search)
export const getSchemes = asyncHandler(async (req, res) => {
  const { state, category, search } = req.query;
  const query = { isActive: true };

  if (state && state !== 'All') {
    query.state = state;
  }

  if (category && category !== 'All') {
    query.category = category;
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  const schemes = await GovernmentScheme.find(query).sort('-createdAt');

  res.status(200).json({ success: true, count: schemes.length, schemes });
});

// @desc    Get single scheme (public)
// @route   GET /api/schemes/:id
// @access  Public
export const getSchemeById = asyncHandler(async (req, res, next) => {
  const scheme = await GovernmentScheme.findById(req.params.id);

  if (!scheme) {
    return next(new AppError('Scheme not found', 404));
  }

  res.status(200).json({ success: true, scheme });
});

// @desc    Create scheme (admin)
// @route   POST /api/schemes
// @access  Private (admin)
export const createScheme = asyncHandler(async (req, res, next) => {
  const { name, category, state, summary, benefits, eligibility, documents, application, officialSource, deadline, icon } = req.body;

  if (!name || !category || !summary) {
    return next(new AppError('Name, category and summary are required', 400));
  }

  const scheme = await GovernmentScheme.create({
    name,
    category,
    state: state || 'All India',
    summary,
    benefits: benefits || [],
    eligibility: eligibility || [],
    documents: documents || [],
    application: application || '',
    officialSource: officialSource || '',
    deadline: deadline || '',
    icon: icon || '',
  });

  res.status(201).json({ success: true, scheme });
});

// @desc    Update scheme (admin)
// @route   PUT /api/schemes/:id
// @access  Private (admin)
export const updateScheme = asyncHandler(async (req, res, next) => {
  let scheme = await GovernmentScheme.findById(req.params.id);

  if (!scheme) {
    return next(new AppError('Scheme not found', 404));
  }

  const fields = ['name', 'category', 'state', 'summary', 'benefits', 'eligibility', 'documents', 'application', 'officialSource', 'deadline', 'icon', 'isActive'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      scheme[field] = req.body[field];
    }
  });

  await scheme.save();

  res.status(200).json({ success: true, scheme });
});

// @desc    Delete scheme (admin)
// @route   DELETE /api/schemes/:id
// @access  Private (admin)
export const deleteScheme = asyncHandler(async (req, res, next) => {
  const scheme = await GovernmentScheme.findById(req.params.id);

  if (!scheme) {
    return next(new AppError('Scheme not found', 404));
  }

  await scheme.deleteOne();

  res.status(200).json({ success: true, message: 'Scheme deleted successfully' });
});