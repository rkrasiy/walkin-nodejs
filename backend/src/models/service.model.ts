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
  time: {
    type: Number,
    required: [true, 'Time is required'],
  },
  state: {
    type: Boolean,
    default: true
  },
});

ServiceSchema.methods.toJSON = function(){
  const {__v, password, _id, ...user } = this.toObject();
  user.uid = _id
  return user;
};

export default model('Service', ServiceSchema);