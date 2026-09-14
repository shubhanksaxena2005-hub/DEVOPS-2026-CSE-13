import Expert from '../models/Expert.js';
import ExpertQuery from '../models/ExpertQuery.js';
import Notification from '../models/Notification.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all experts (public)
// @route   GET /api/experts
// @access  Public
export const getExperts = asyncHandler(async (req, res) => {
  const { specialty, search } = req.query;
  const query = { isActive: true, available: true };

  if (specialty) {
    query.specialty = { $regex: specialty, $options: 'i' };
  }

  const experts = await Expert.find(query)
    .populate('user', 'name email location profileImage')
    .sort('-rating');

  // Apply search filter after populate (search on name/location)
  let filtered = experts;
  if (search) {
    const term = search.toLowerCase();
    filtered = experts.filter(
      (e) =>
        e.user?.name?.toLowerCase().includes(term) ||
        e.location?.toLowerCase().includes(term) ||
        e.specialty?.toLowerCase().includes(term)
    );
  }

  res.status(200).json({ success: true, count: filtered.length, experts: filtered });
});

// @desc    Get single expert
// @route   GET /api/experts/:id
// @access  Public
export const getExpertById = asyncHandler(async (req, res, next) => {
  const expert = await Expert.findById(req.params.id).populate('user', 'name email location profileImage');

  if (!expert) {
    return next(new AppError('Expert not found', 404));
  }

  res.status(200).json({ success: true, expert });
});

// @desc    Create expert profile (admin)
// @route   POST /api/experts
// @access  Private (admin)
export const createExpert = asyncHandler(async (req, res, next) => {
  const { user, specialty, experience, location, languages, bio, availability, price } = req.body;

  if (!user || !specialty) {
    return next(new AppError('User reference and specialty are required', 400));
  }

  const expertExists = await Expert.findOne({ user });
  if (expertExists) {
    return next(new AppError('Expert profile already exists for this user', 400));
  }

  const expert = await Expert.create({
    user,
    specialty,
    experience: experience || '',
    location: location || '',
    languages: languages || [],
    bio: bio || '',
    availability: availability || '',
    price: price || '',
  });

  res.status(201).json({ success: true, expert });
});

// @desc    Update expert profile (admin or self)
// @route   PUT /api/experts/:id
// @access  Private (admin or expert)
export const updateExpert = asyncHandler(async (req, res, next) => {
  let expert = await Expert.findById(req.params.id);

  if (!expert) {
    return next(new AppError('Expert not found', 404));
  }

  // Expert can only update their own profile; admin can update any
  if (req.user.role === 'expert' && expert.user.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to update this expert profile', 403));
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

// @desc    Delete expert
// @route   DELETE /api/experts/:id
// @access  Private (admin)
export const deleteExpert = asyncHandler(async (req, res, next) => {
  const expert = await Expert.findById(req.params.id);

  if (!expert) {
    return next(new AppError('Expert not found', 404));
  }

  await ExpertQuery.deleteMany({ expert: expert._id });
  await expert.deleteOne();

  res.status(200).json({ success: true, message: 'Expert deleted successfully' });
});

// ==============================
// Expert Queries
// ==============================

// @desc    Create a consultation request (farmer)
// @route   POST /api/expert-queries
// @access  Private (farmer)
export const createExpertQuery = asyncHandler(async (req, res, next) => {
  const { expert, topic, description } = req.body;

  if (!expert || !topic || !description) {
    return next(new AppError('Expert, topic and description are required', 400));
  }

  const images = req.files ? req.files.map((f) => `/uploads/${f.filename}`) : [];

  const query = await ExpertQuery.create({
    farmer: req.user._id,
    expert,
    topic,
    description,
    images,
  });

  // Notify the expert
  const expertProfile = await Expert.findById(expert).populate('user', 'name');
  if (expertProfile) {
    await Notification.create({
      user: expertProfile.user._id,
      type: 'expert',
      title: 'New Consultation Request',
      message: `${req.user.name} has submitted a new query: ${topic}`,
      icon: 'userCheck',
      color: 'orange',
      data: { queryId: query._id },
    });
  }

  res.status(201).json({ success: true, query });
});

// @desc    Get queries for current user
//         - Farmers see their own queries
//         - Experts see queries assigned to them
//         - Admin sees all
// @route   GET /api/expert-queries
// @access  Private
export const getExpertQueries = asyncHandler(async (req, res) => {
  let query = {};

  if (req.user.role === 'farmer') {
    query.farmer = req.user._id;
  } else if (req.user.role === 'expert') {
    const expert = await Expert.findOne({ user: req.user._id });
    if (!expert) {
      return res.status(200).json({ success: true, count: 0, queries: [] });
    }
    query.expert = expert._id;
  }

  const queries = await ExpertQuery.find(query)
    .populate('farmer', 'name email phone location')
    .populate({
      path: 'expert',
      populate: { path: 'user', select: 'name email profileImage' },
    })
    .sort('-createdAt');

  res.status(200).json({ success: true, count: queries.length, queries });
});

// @desc    Answer a query (expert)
// @route   PUT /api/expert-queries/:id/answer
// @access  Private (expert or admin)
export const answerExpertQuery = asyncHandler(async (req, res, next) => {
  const query = await ExpertQuery.findById(req.params.id);

  if (!query) {
    return next(new AppError('Query not found', 404));
  }

  if (req.user.role === 'expert') {
    const expert = await Expert.findOne({ user: req.user._id });
    if (!expert || expert._id.toString() !== query.expert.toString()) {
      return next(new AppError('Not authorized to answer this query', 403));
    }
  }

  const { text } = req.body;
  if (!text) {
    return next(new AppError('Answer text is required', 400));
  }

  query.answer = {
    text,
    answeredAt: Date.now(),
  };
  query.answeredBy = req.user._id;
  query.status = 'answered';
  await query.save();

  // Notify farmer
  await Notification.create({
    user: query.farmer,
    type: 'expert',
    title: 'Expert Response Received',
    message: `Your query "${query.topic}" has been answered. Tap to view response.`,
    icon: 'userCheck',
    color: 'orange',
    data: { queryId: query._id },
  });

  res.status(200).json({ success: true, query });
});

// @desc    Close query (farmer or admin)
// @route   PUT /api/expert-queries/:id/close
// @access  Private (farmer owner or admin)
export const closeExpertQuery = asyncHandler(async (req, res, next) => {
  const query = await ExpertQuery.findById(req.params.id);

  if (!query) {
    return next(new AppError('Query not found', 404));
  }

  if (req.user.role === 'farmer' && query.farmer.toString() !== req.user._id.toString()) {
    return next(new AppError('Not authorized to close this query', 403));
  }

  query.status = 'closed';
  await query.save();

  res.status(200).json({ success: true, query });
});