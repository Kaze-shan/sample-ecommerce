import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  image: {
    type: Array,
    default: [],
  },
  discount: {
    type: ObjectId,
    ref: 'Discount',
  },
  productCode: {
    type: String,
    required: true,
  },
  parentID: {
    type: String,
  },
}, {timestamps: true});

export default mongoose.model('Product', userSchema);
