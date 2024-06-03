import { Schema, model } from 'mongoose';
import { Role } from '../interfaces/manager.interface';

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
});

UserSchema.methods.toJSON = function(){
  const {__v, password, _id, ...user } = this.toObject();
  user.uid = _id
  return user;
};

export default model('User', UserSchema);