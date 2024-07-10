import { Request, Response, NextFunction } from "express"; 
import mongoose from "mongoose";

export const switchDatabase = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dbName = req.header('x-db-name');
    if (dbName) {
      req.db = mongoose.connection.useDb(dbName);
      console.log(`Switched to database: ${dbName}`);
    }
    next();
  };
};