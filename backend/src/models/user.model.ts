import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  full_name: {
    type: String,
    required: [true, 'Full name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true
  },
  state: {
    type: Boolean,
    default: true
  },
  created_on: {
    type: Date
  }
});

export default model('User', UserSchema);