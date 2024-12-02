import { Schema, model } from 'mongoose';

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Service name is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  discount: {
    type: Number,
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
  },
  state: {
    type: Boolean,
    default: true
  },
  created_on: {
    type: Date
  }
});

export default model('Service', ServiceSchema);