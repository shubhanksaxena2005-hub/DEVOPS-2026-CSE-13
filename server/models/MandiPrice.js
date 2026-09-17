import mongoose from 'mongoose';

const mandiPriceSchema = new mongoose.Schema(
  {
    crop: {
      type: String,
      required: [true, 'Crop name is required'],
      trim: true,
    },
    market: {
      type: String,
      required: [true, 'Market name is required'],
      trim: true,
    },
    current: {
      type: Number,
      required: [true, 'Current price is required'],
      min: [0, 'Price cannot be negative'],
    },
    previous: {
      type: Number,
      default: 0,
    },
    change: {
      type: Number,
      default: 0,
    },
    changePercent: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: '₹/quintal',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isSample: {
      type: Boolean,
      default: true,
      // Clearly marks seed/sample data vs live API data
    },
  },
  {
    timestamps: true,
  }
);

const MandiPrice = mongoose.model('MandiPrice', mandiPriceSchema);

export default MandiPrice;