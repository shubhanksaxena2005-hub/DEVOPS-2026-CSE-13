import mongoose from 'mongoose';

const diseaseScanSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    crop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crop',
    },
    cropName: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    result: {
      disease: String,
      confidence: Number,
      description: String,
      recommendations: [String],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const DiseaseScan = mongoose.model('DiseaseScan', diseaseScanSchema);

export default DiseaseScan;