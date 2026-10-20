import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Seeds', 'Fertilizers', 'Pesticides', 'Labor', 'Irrigation', 'Equipment', 'Transport', 'Other'],
      default: 'Other',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    billImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;