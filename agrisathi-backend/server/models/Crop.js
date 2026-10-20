import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farm',
    },
    name: {
      type: String,
      required: [true, 'Crop name is required'],
      trim: true,
    },
    variety: {
      type: String,
      default: '',
    },
    area: {
      type: Number,
      required: [true, 'Crop area is required'],
      min: [0.01, 'Area must be greater than 0'],
    },
    areaUnit: {
      type: String,
      enum: ['acres', 'hectares', 'guntha'],
      default: 'acres',
    },
    plantedDate: {
      type: Date,
      default: null,
    },
    expectedHarvestDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      default: 'Growing',
    },
    health: {
      type: String,
      enum: ['Good', 'Fair', 'Poor', 'Unknown'],
      default: 'Good',
    },
    soilType: {
      type: String,
      default: '',
    },
    progress: {
      type: Number,
      default: 0,
      min: [0, 'Progress cannot be below 0'],
      max: [100, 'Progress cannot exceed 100'],
    },
    season: {
      type: String,
      enum: ['Kharif', 'Rabi', 'Perennial', ''],
      default: '',
    },
    stage: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Crop = mongoose.model('Crop', cropSchema);

export default Crop;