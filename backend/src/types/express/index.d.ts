// @types/express/index.d.ts
import { IUser } from '../../path-to-your-user.interface';
import mongoose from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
