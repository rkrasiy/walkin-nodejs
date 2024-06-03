
import bcryptjs from 'bcryptjs';
import { Response, Request } from "express";

import generateJWT from '../helpers/generate-jwt'
import managerModel from '../models/manager.model';

const loginController = async(req: Request, res: Response) => {
  const {email, password} = req.body;

  try{

    //Check email exist
    const user = await managerModel.findOne({ email });
    if( !user ){
      return res.status(400).json({
        msg: 'Email or Password does\'t correct'
      });
    }

    // Check if user state is TRUE
    if(!user.state){
      return res.status(400).json({
        msg: 'Check your state'
      })
    }

    // Check psw
    const isValidPsw = bcryptjs.compareSync( password, user.password );
    if(!isValidPsw){
      return res.status(400).json({
        msg: 'Email or Password does\'t correct. PSW'
      });
    }

    // Generate JWT
    const token = await generateJWT( user.id );

    res.json({
      user,
      token
    });

  }catch(err){
    console.log(err);
    return res.status(500).json({
      msg: 'Ask an admin'
    })
  }


};

export default loginController;