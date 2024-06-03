import userModel from "../models/user.model";
import roleModel from "../models/role.model";
import managerModel from "../models/manager.model";
import serviceModel from "../models/service.model";

export const isValidRole = async(rol = '') => {
  const isExistRole = await roleModel.findOne({ name: rol});
  if(!isExistRole){
    throw new Error(`Role ${rol} is not registrated in database`)
  }
};

export const isUniqEmail = async(email = '') => {
    // Check if email exist;
  const existEmail = await userModel.findOne({ email });
  if(existEmail){
    throw new Error(`${email} already exist`)
  }
}

export const isUniqPhone = async(phone = '') => {
  // Check if email exist;
const existPhone = await userModel.findOne({ phone });
if(existPhone){
  throw new Error(`${phone} already exist`)
}
}

export const isUserIdExist = async(id = '') => {
  // Check if email exist;
  const existUserID = await userModel.findById(id);
  if(!existUserID){
    throw new Error(`ID: ${id} does't exist`)
  }
}

export const isManagerIdExist = async(id = '') => {
  // Check if email exist;
  const existUserID = await managerModel.findById(id);
  if(!existUserID){
    throw new Error(`ID: ${id} does't exist`)
  }
}

export const isServiceIdExist = async(id = '') => {
  // Check if email exist;
  const existUserID = await serviceModel.findById(id);
  if(!existUserID){
    throw new Error(`ID: ${id} does't exist`)
  }
}