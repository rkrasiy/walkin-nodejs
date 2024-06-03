import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Role name is required']
  }
});

export default model('Role', RoleSchema);