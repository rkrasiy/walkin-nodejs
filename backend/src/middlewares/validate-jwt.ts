import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from '../interfaces/request.interface';
import userModel from "../models/user.model";

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-token')

  if(!token){
    return res.status(401).json({
      msg: 'Token is required'
    })
  }

  try{
    const {uid} = jwt.verify( token, process.env.SECRETORPRIVATEKEY! ) as {uid: string};
    const user = await userModel.findById( uid );

    if(!user){
      return res.status(401).json({
        msg: 'Token isn\'t valid'
      })
    }
    //Is active user
    if(!user.state){
      return res.status(401).json({
        msg: 'Token isn\'t valid'
      })
    }

    req.user = user;

    next();
  }catch(err){
    console.log(err);
    res.status(401).json({
      msg: 'Token is not valid'
    })
  }
};