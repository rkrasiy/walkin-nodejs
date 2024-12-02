import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  fullName: {
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
  },
  state: {
    type: Boolean,
    default: true
  },
  created_on: {
    type: Date,
    required: true,
  },
  notifications: {
    type: Boolean,
    required: [true, 'Notifications is required'],
  }
});

UserSchema.methods.toJSON = function(){
  const {__v, notifications, created_on, ...user } = this.toObject();
  return user;
};

export default model('User', UserSchema);