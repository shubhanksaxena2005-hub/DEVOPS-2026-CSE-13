import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Expert from '../models/Expert.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone, role, location } = req.body;

  if (!name || !email || !password) {
    return next(new AppError('Please provide name, email and password', 400));
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError('User already exists with this email', 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    phone: phone || '',
    role: role || 'farmer',
    location: location || {},
  });

  // If expert, create expert profile
  if (user.role === 'expert') {
    await Expert.create({
      user: user._id,
      specialty: req.body.specialty || '',
      experience: req.body.experience || '',
      location: req.body.expertLocation || '',
      bio: req.body.bio || '',
      languages: req.body.languages || [],
      availability: req.body.availability || '',
      price: req.body.price || '',
    });
  }

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      location: user.location,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
    },
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new AppError('Invalid email or password', 401));
  }

  if (!user.isActive) {
    return next(new AppError('Account is deactivated. Contact admin.', 401));
  }

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      location: user.location,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
    },
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  // JWT is stateless; client removes token. This endpoint is for completeness.
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  let expertProfile = null;
  if (user.role === 'expert') {
    expertProfile = await Expert.findOne({ user: user._id });
  }

  res.status(200).json({
    success: true,
    user,
    expertProfile,
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res, next) => {
  const { name, phone, location, specialty, experience, bio, languages, availability, price } = req.body;

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (location) user.location = { ...user.location, ...location };
  if (req.file) user.profileImage = `/uploads/${req.file.filename}`;

  await user.save();

  // Update expert profile if role is expert
  if (user.role === 'expert') {
    const expert = await Expert.findOne({ user: user._id });
    if (expert) {
      if (specialty) expert.specialty = specialty;
      if (experience) expert.experience = experience;
      if (bio) expert.bio = bio;
      if (languages) expert.languages = languages;
      if (availability) expert.availability = availability;
      if (price) expert.price = price;
      await expert.save();
    }
  }

  res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      location: user.location,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
    },
  });
});