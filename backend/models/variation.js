import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  productID: {
    type: ObjectId,
    ref: 'Product',
  },
  image: {
    type: String,
  },
}, {timestamps: true});

export default mongoose.model('Variation', userSchema);
