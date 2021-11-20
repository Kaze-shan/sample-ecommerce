import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parentID: {
    type: ObjectId,
    ref: 'Catagory',
  },
  order: {
    type: Number,
    required: true,
  },
  childID: [{
    type: ObjectId,
    ref: 'Catagory',
  }],
}, {timestamps: true});

export default mongoose.model('Catagory', userSchema);
