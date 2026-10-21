import mongoose from 'mongoose';

const governmentSchemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Scheme name is required'],
      trim: true,
      maxlength: [200, 'Scheme name cannot exceed 200 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    state: {
      type: String,
      default: 'All India',
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true,
    },
    benefits: {
      type: [String],
      default: [],
    },
    eligibility: {
      type: [String],
      default: [],
    },
    documents: {
      type: [String],
      default: [],
    },
    application: {
      type: String,
      default: '',
    },
    officialSource: {
      type: String,
      default: '',
    },
    deadline: {
      type: String,
      default: '',
    },
    icon: {
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

const GovernmentScheme = mongoose.model('GovernmentScheme', governmentSchemeSchema);

export default GovernmentScheme;