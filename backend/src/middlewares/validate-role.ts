import { Request, NextFunction, Response } from "express";

export const isAdminRole = ( req: Request, res: Response, next: NextFunction) => {
  if(!req.user){
    return res.status(500).json({
      msg: 'Token should be validated first'
    });
  }

  const { role, name } = req.user;
  if( role !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg: `${name} doesn't have permissions`
    });
  }

  next();
}

export const hasPermissions = ( req: Request<{user?: string}>, res: Response, next: NextFunction) => {
  if(!req.user){
    return res.status(500).json({
      msg: 'Token should be validated first'
    });
  }

  const { role, name } = req.user;
  if( role !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg: `${name} doesn't have permissions`
    });
  }

  next();
}