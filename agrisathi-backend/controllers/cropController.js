const asyncHandler = require("express-async-handler");
const Crop = require("../models/Crop");

// @desc    Get all crops (with optional search/filter)
// @route   GET /api/crops
// @access  Public
const getCrops = asyncHandler(async (req, res) => {
  const { season, search } = req.query;
  const filter = {};

  if (season) filter.season = season;
  if (search) filter.name = { $regex: search, $options: "i" };

  const crops = await Crop.find(filter).sort({ name: 1 });
  res.json({ success: true, count: crops.length, data: crops });
});

// @desc    Get single crop by id
// @route   GET /api/crops/:id
// @access  Public
const getCropById = asyncHandler(async (req, res) => {
  const crop = await Crop.findById(req.params.id);
  if (!crop) {
    res.status(404);
    throw new Error("Crop not found");
  }
  res.json({ success: true, data: crop });
});

// @desc    Create a new crop advisory entry
// @route   POST /api/crops
// @access  Private/Admin
const createCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.create(req.body);
  res.status(201).json({ success: true, data: crop });
});

// @desc    Update a crop entry
// @route   PUT /api/crops/:id
// @access  Private/Admin
const updateCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findById(req.params.id);
  if (!crop) {
    res.status(404);
    throw new Error("Crop not found");
  }
  Object.assign(crop, req.body);
  const updated = await crop.save();
  res.json({ success: true, data: updated });
});

// @desc    Delete a crop entry
// @route   DELETE /api/crops/:id
// @access  Private/Admin
const deleteCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findById(req.params.id);
  if (!crop) {
    res.status(404);
    throw new Error("Crop not found");
  }
  await crop.deleteOne();
  res.json({ success: true, message: "Crop deleted" });
});

module.exports = {
  getCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
};
