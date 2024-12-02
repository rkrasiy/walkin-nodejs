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

QuotesSchema.methods.toJSON = function(){
  const {__v, confirmationToken, ...quote } = this.toObject();
  return quote;
};

export default model('Quote', QuotesSchema);