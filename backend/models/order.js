import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  orderNO: {
    type: String,
    required: true,
  },
  orderProduct: [{
    type: Object,
  }],
  subtotal: {
    type: Number,
    required: true,
  },
  shippingFee: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  customerInfo: {
    type: Object,
  },
  member: {
    type: ObjectId,
    ref: 'User',
  },
}, {timestamps: true});

export default mongoose.model('Order', userSchema);
