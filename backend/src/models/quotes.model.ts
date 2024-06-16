import { Schema, model } from 'mongoose';

const QuotesSchema = new Schema({
  service: {
    type: String,
    required: [true, 'Service ID is required']
  },
  user: {
    type: String,
    required: [true, 'User ID is required'],
  },
  start: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  end: {
    type: Date,
    required: [true, 'End date is required'],
  },
  created_on: {
    type: Date
  },
  state: {
    type: Boolean,
    default: true
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  confirmationToken: {
    type: String,
    required: true,
    unique: true
  }
});

export default model('Quote', QuotesSchema);