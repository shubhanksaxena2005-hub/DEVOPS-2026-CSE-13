import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

// Protect routes — verifies JWT and attaches user to request
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Not authorized, no token provided', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new AppError('User not found', 401));
    }

    if (!user.isActive) {
      return next(new AppError('Account is deactivated', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Not authorized, token invalid or expired', 401));
  }
});

// Role-based authorization
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(`Role ${req.user.role} is not authorized to access this route`, 403));
    }
    next();
  };
};