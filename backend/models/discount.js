import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
}, {timestamps: true});

export default mongoose.model('Discount', userSchema);
