import { Schema, model } from 'mongoose';
import { Role } from '../interfaces/manager.interface';

const ManagerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  surname: {
    type: String,
    required: [true, 'Surname is required']
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
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    required: true,
    enum: Role
  },
  state: {
    type: Boolean,
    default: true
  },
  service: {
    type: String
  }
});

ManagerSchema.methods.toJSON = function(){
  const {__v, password, _id, ...user } = this.toObject();
  user.uid = _id
  return user;
};

export default model('Manager', ManagerSchema);