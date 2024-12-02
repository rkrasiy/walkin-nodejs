import 'dotenv/config';
import { Request, Response, NextFunction } from "express";

export const validateApiKey = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('x-api-key')

  if(!apiKey){
    return res.status(401).json({
      msg: 'Api Key is required'
    })
  }

  if(apiKey !== process.env.API_KEY){
    return res.status(404).json({
      msg: 'Api Key is not valid'
    })
  }

  next();
};