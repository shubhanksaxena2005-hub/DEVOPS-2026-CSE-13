import MandiPrice from '../models/MandiPrice.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all mandi prices
// @route   GET /api/mandi
// @access  Public
export const getMandiPrices = asyncHandler(async (req, res) => {
  const { crop, market } = req.query;
  const query = {};

  if (crop) query.crop = crop;
  if (market) query.market = market;

  const prices = await MandiPrice.find(query).sort('-date');

  res.status(200).json({
    success: true,
    count: prices.length,
    isSample: prices.length > 0 ? prices.every((p) => p.isSample) : true,
    prices,
  });
});

// @desc    Get mandi price for a specific crop
// @route   GET /api/mandi/:crop
// @access  Public
export const getMandiPriceByCrop = asyncHandler(async (req, res, next) => {
  const crop = req.params.crop;

  const prices = await MandiPrice.find({ crop: { $regex: new RegExp(`^${crop}$`, 'i') } }).sort('-date');

  if (prices.length === 0) {
    return next(new AppError(`No mandi prices found for crop: ${crop}`, 404));
  }

  res.status(200).json({
    success: true,
    count: prices.length,
    isSample: prices.every((p) => p.isSample),
    prices,
  });
});

// @desc    Get all unique markets
// @route   GET /api/mandi/markets
// @access  Public
export const getMarkets = asyncHandler(async (req, res) => {
  const markets = await MandiPrice.distinct('market');

  res.status(200).json({ success: true, count: markets.length, markets });
});

// @desc    Create mandi price (admin)
// @route   POST /api/mandi
// @access  Private (admin)
export const createMandiPrice = asyncHandler(async (req, res, next) => {
  const { crop, market, current, previous, unit, date, isSample } = req.body;

  if (!crop || !market || !current) {
    return next(new AppError('Crop, market and current price are required', 400));
  }

  const prev = previous || 0;
  const change = current - prev;
  const changePercent = prev > 0 ? ((change / prev) * 100).toFixed(2) : 0;

  const price = await MandiPrice.create({
    crop,
    market,
    current,
    previous: prev,
    change,
    changePercent,
    unit: unit || '₹/quintal',
    date: date || Date.now(),
    isSample: isSample !== undefined ? isSample : false,
  });

  res.status(201).json({ success: true, price });
});

// @desc    Update mandi price (admin)
// @route   PUT /api/mandi/:id
// @access  Private (admin)
export const updateMandiPrice = asyncHandler(async (req, res, next) => {
  let price = await MandiPrice.findById(req.params.id);

  if (!price) {
    return next(new AppError('Mandi price record not found', 404));
  }

  const fields = ['crop', 'market', 'current', 'previous', 'unit', 'date', 'isSample'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      price[field] = req.body[field];
    }
  });

  // Recalculate change
  price.change = price.current - price.previous;
  price.changePercent = price.previous > 0 ? ((price.change / price.previous) * 100).toFixed(2) : 0;

  await price.save();

  res.status(200).json({ success: true, price });
});

// @desc    Delete mandi price (admin)
// @route   DELETE /api/mandi/:id
// @access  Private (admin)
export const deleteMandiPrice = asyncHandler(async (req, res, next) => {
  const price = await MandiPrice.findById(req.params.id);

  if (!price) {
    return next(new AppError('Mandi price record not found', 404));
  }

  await price.deleteOne();

  res.status(200).json({ success: true, message: 'Mandi price record deleted successfully' });
});