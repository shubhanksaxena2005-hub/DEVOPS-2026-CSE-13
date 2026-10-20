import mongoose from 'mongoose';

const farmActivitySchema = new mongoose.Schema(
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
    crop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crop',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      required: [true, 'Activity title is required'],
      trim: true,
      maxlength: [200, 'Activity title cannot exceed 200 characters'],
    },
    activityType: {
      type: String,
      enum: ['Sowing', 'Weeding', 'Fertilizer', 'Pesticide', 'Irrigation', 'Harvest', 'Inspection', 'Labor', 'Other'],
      default: 'Other',
    },
    cropName: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
    },
    timeSpent: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const FarmActivity = mongoose.model('FarmActivity', farmActivitySchema);

export default FarmActivity;