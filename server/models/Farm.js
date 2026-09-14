import mongoose from 'mongoose';

const farmSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Farm name is required'],
      trim: true,
      maxlength: [100, 'Farm name cannot exceed 100 characters'],
    },
    location: {
      village: String,
      taluka: String,
      district: String,
      state: String,
      address: String,
    },
    landArea: {
      type: Number,
      required: [true, 'Land area is required'],
      min: [0.01, 'Land area must be greater than 0'],
    },
    landUnit: {
      type: String,
      enum: ['acres', 'hectares', 'guntha'],
      default: 'acres',
    },
    soilType: {
      type: String,
      default: '',
    },
    soilPh: {
      type: Number,
      default: null,
    },
    nitrogen: {
      type: Number,
      default: 0,
    },
    phosphorus: {
      type: Number,
      default: 0,
    },
    potassium: {
      type: Number,
      default: 0,
    },
    waterSource: {
      type: String,
      default: '',
    },
    activeSince: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Farm = mongoose.model('Farm', farmSchema);

export default Farm;