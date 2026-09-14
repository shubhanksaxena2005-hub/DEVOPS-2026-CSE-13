import mongoose from 'mongoose';

const expertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    specialty: {
      type: String,
      required: [true, 'Specialty is required'],
      trim: true,
    },
    experience: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be below 0'],
      max: [5, 'Rating cannot exceed 5'],
    },
    consultations: {
      type: Number,
      default: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
    languages: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: '',
    },
    availability: {
      type: String,
      default: '',
    },
    price: {
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

const Expert = mongoose.model('Expert', expertSchema);

export default Expert;